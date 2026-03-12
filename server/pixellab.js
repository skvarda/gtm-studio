const fs = require('fs');
const path = require('path');

const PIXELLAB_BASE = 'https://api.pixellab.ai/v2';

// Style enum maps — PixelLab uses different values for different endpoint families
const IMAGE_STYLE = {
  outline: 'selective outline',
  shading: 'medium shading',
  detail: 'medium detail'
};

const CHARACTER_STYLE = {
  outline: 'thin',
  shading: 'soft',
  detail: 'medium'
};

function getHeaders() {
  return {
    'Authorization': `Bearer ${process.env.PIXELLAB_API_KEY}`,
    'Content-Type': 'application/json'
  };
}

// Check account balance/credits
async function getBalance() {
  const res = await fetch(`${PIXELLAB_BASE}/balance`, { headers: getHeaders() });
  if (!res.ok) throw new Error(`PixelLab balance check failed: ${res.status}`);
  return res.json();
}

// Generate a single image (tiles, objects, UI elements)
// Uses the pixflux model — supports up to 400x400px
async function generateImage(description, width, height, options = {}) {
  const body = {
    description,
    image_size: { width, height },
    no_background: options.noBackground || false,
    text_guidance_scale: options.guidanceScale || 8,
    seed: options.seed || null
  };
  // Only add optional style fields if provided
  if (options.view) body.view = options.view;
  if (options.outline || IMAGE_STYLE.outline) body.outline = options.outline || IMAGE_STYLE.outline;
  if (options.shading || IMAGE_STYLE.shading) body.shading = options.shading || IMAGE_STYLE.shading;
  if (options.detail || IMAGE_STYLE.detail) body.detail = options.detail || IMAGE_STYLE.detail;
  if (options.colorImage) body.color_image = options.colorImage;
  if (options.direction) body.direction = options.direction;
  if (options.initImage) {
    body.init_image = options.initImage;
    body.init_image_strength = options.initImageStrength || 300;
  }

  const res = await fetch(`${PIXELLAB_BASE}/create-image-pixflux`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`PixelLab generate-image failed (${res.status}): ${errText}`);
  }
  return res.json();
}

// Generate a map object — purpose-built for game props with transparent backgrounds
// Better than pixflux for items that sit on a game map
async function generateMapObject(description, width, height, options = {}) {
  const body = {
    description,
    image_size: { width, height },
    view: options.view || 'high top-down',
    text_guidance_scale: options.guidanceScale || 8,
    seed: options.seed || null
  };
  if (options.outline) body.outline = options.outline;
  if (options.shading) body.shading = options.shading;
  if (options.detail) body.detail = options.detail;
  if (options.colorImage) body.color_image = options.colorImage;
  if (options.initImage) {
    body.init_image = options.initImage;
    body.init_image_strength = options.initImageStrength || 300;
  }

  const res = await fetch(`${PIXELLAB_BASE}/map-objects`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`PixelLab map-objects failed (${res.status}): ${errText}`);
  }
  return res.json();
}

// Create a character with 4 directional views (async — returns job ID)
async function createCharacter4Dir(description, width, height, options = {}) {
  const body = {
    description,
    image_size: { width, height },
    async_mode: true,
    view: options.view || 'high top-down',
    text_guidance_scale: options.guidanceScale || 8,
    outline: options.outline || CHARACTER_STYLE.outline,
    shading: options.shading || CHARACTER_STYLE.shading,
    detail: options.detail || CHARACTER_STYLE.detail,
    seed: options.seed || null
  };
  if (options.colorImage) {
    body.color_image = options.colorImage;
    body.force_colors = true;
  }
  if (options.isometric) body.isometric = true;

  const res = await fetch(`${PIXELLAB_BASE}/create-character-with-4-directions`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`PixelLab create-character failed (${res.status}): ${errText}`);
  }
  return res.json();
}

// Animate an existing character (async — returns job ID)
async function animateCharacter(characterId, templateAnimationId, options = {}) {
  const body = {
    character_id: characterId,
    template_animation_id: templateAnimationId,
    async_mode: true
  };
  if (options.actionDescription) body.action_description = options.actionDescription;
  if (options.animationName) body.animation_name = options.animationName;
  if (options.directions) body.directions = options.directions;
  if (options.seed) body.seed = options.seed;

  const res = await fetch(`${PIXELLAB_BASE}/characters/animations`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`PixelLab animate-character failed (${res.status}): ${errText}`);
  }
  return res.json();
}

// Create a Wang tileset (async — returns job ID)
async function createTileset(lowerDesc, upperDesc, options = {}) {
  const body = {
    lower_description: lowerDesc,
    upper_description: upperDesc,
    tile_size: {
      width: options.tileWidth || 32,
      height: options.tileHeight || 32
    },
    view: options.view || 'high top-down',
    text_guidance_scale: options.guidanceScale || 8
  };
  if (options.transitionDescription) body.transition_description = options.transitionDescription;
  if (options.outline) body.outline = options.outline;
  if (options.shading) body.shading = options.shading;
  if (options.detail) body.detail = options.detail;

  const res = await fetch(`${PIXELLAB_BASE}/tilesets`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`PixelLab create-tileset failed (${res.status}): ${errText}`);
  }
  return res.json();
}

// Retrieve a completed tileset by ID (tilesets return 202 and process async)
async function getTileset(tilesetId) {
  const res = await fetch(`${PIXELLAB_BASE}/tilesets/${tilesetId}`, {
    headers: getHeaders()
  });
  if (res.status === 423) {
    return { status: 'processing', tilesetId };
  }
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`PixelLab get-tileset failed (${res.status}): ${errText}`);
  }
  return res.json();
}

// Poll a background job for completion
async function getJobStatus(jobId) {
  const res = await fetch(`${PIXELLAB_BASE}/background-jobs/${jobId}`, {
    headers: getHeaders()
  });
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`PixelLab job poll failed (${res.status}): ${errText}`);
  }
  return res.json();
}

// Get character details (includes all directional sprites)
async function getCharacter(characterId) {
  const res = await fetch(`${PIXELLAB_BASE}/characters/${characterId}`, {
    headers: getHeaders()
  });
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`PixelLab get-character failed (${res.status}): ${errText}`);
  }
  return res.json();
}

// Download character as ZIP (all sprites + animations)
async function downloadCharacterZip(characterId, outputPath) {
  const res = await fetch(`${PIXELLAB_BASE}/characters/${characterId}/zip`, {
    headers: { 'Authorization': `Bearer ${process.env.PIXELLAB_API_KEY}` }
  });
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`PixelLab download-zip failed (${res.status}): ${errText}`);
  }
  const buffer = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(outputPath, buffer);
  return outputPath;
}

// List all user characters
async function listCharacters(limit = 100) {
  const res = await fetch(`${PIXELLAB_BASE}/characters?limit=${limit}`, {
    headers: getHeaders()
  });
  if (!res.ok) throw new Error(`PixelLab list-characters failed: ${res.status}`);
  return res.json();
}

// Helper: save base64 image data to disk
function saveImageFromResponse(responseData, outputPath) {
  let b64 = null;

  // PixelLab v2 wraps responses in { success, data, error, usage }
  // The image data can appear in several shapes depending on the endpoint

  // Shape 1: { data: { image: { base64: "..." } } }  — pixflux, bitforge
  if (responseData.data?.image?.base64) b64 = responseData.data.image.base64;
  // Shape 2: { data: { images: [{ base64: "..." }] } }  — batch endpoints
  else if (responseData.data?.images?.[0]?.base64) b64 = responseData.data.images[0].base64;
  // Shape 3: { image: { base64: "..." } }  — unwrapped
  else if (responseData.image?.base64) b64 = responseData.image.base64;
  // Shape 4: { images: [{ base64: "..." }] }  — unwrapped batch
  else if (responseData.images?.[0]?.base64) b64 = responseData.images[0].base64;
  // Shape 5: { data: { base64: "..." } }  — direct base64 in data
  else if (responseData.data?.base64) b64 = responseData.data.base64;
  // Shape 6: { data: "base64string" }  — raw string
  else if (typeof responseData.data === 'string' && responseData.data.length > 100) b64 = responseData.data;
  // Shape 7: Top-level base64
  else if (typeof responseData === 'string' && responseData.length > 100) b64 = responseData;

  if (!b64) {
    // Diagnostic logging — this tells us the ACTUAL shape so we can fix it
    const topKeys = Object.keys(responseData || {});
    const dataKeys = responseData.data ? Object.keys(responseData.data) : [];
    console.error('[PixelLab] Could not extract image. Top-level keys:', JSON.stringify(topKeys));
    console.error('[PixelLab] data keys:', JSON.stringify(dataKeys));
    console.error('[PixelLab] Response preview:', JSON.stringify(responseData).substring(0, 800));
    return null;
  }

  // Strip data URL prefix if present (e.g. "data:image/png;base64,...")
  if (b64.startsWith('data:')) {
    b64 = b64.split(',')[1];
  }

  const buffer = Buffer.from(b64, 'base64');
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, buffer);
  console.log(`[PixelLab] Saved ${buffer.length} bytes to ${outputPath}`);
  return outputPath;
}

module.exports = {
  getBalance,
  generateImage,
  generateMapObject,
  createCharacter4Dir,
  animateCharacter,
  createTileset,
  getTileset,
  getJobStatus,
  getCharacter,
  downloadCharacterZip,
  listCharacters,
  saveImageFromResponse,
  IMAGE_STYLE,
  CHARACTER_STYLE
};
