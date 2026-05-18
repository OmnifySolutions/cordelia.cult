// Tool launcher tile config.
// Update URLs in one place. App.js renders these into The Atelier grid.

export const groups = {
  generate: { label: "Generate", note: "stills + image-to-video" },
  edit:     { label: "Edit",     note: "trim, grade, caption" },
  post:     { label: "Post",     note: "the five rails" },
  hub:      { label: "Hub",      note: "links + newsletter + storefront" },
  affiliates: { label: "Affiliates", note: "program dashboards" },
};

export const tiles = [
  // ---------- Generate ----------
  {
    group: "generate",
    label: "SDXL Colab",
    url: "https://colab.research.google.com/",
    note: "sdxl_pipeline.ipynb — open from Drive",
  },
  {
    group: "generate",
    label: "Seedance 2.0",
    url: "https://seedance.ai/",
    note: "primary i2v · 100 credits/day",
  },
  {
    group: "generate",
    label: "Kling AI",
    url: "https://klingai.com/",
    note: "secondary · 66 credits/day · watermarked",
  },
  {
    group: "generate",
    label: "Wan 2.2 Colab",
    url: "https://github.com/theelderemo/wan2.2-google-colab",
    note: "unlimited backup",
  },
  {
    group: "generate",
    label: "Video Realistic Colab",
    url: "https://colab.research.google.com/",
    note: "LivePortrait + SadTalker — precision only",
  },
  {
    group: "generate",
    label: "Civitai (LoRA)",
    url: "https://civitai.com/training",
    note: "retrain on consistency drift",
  },

  // ---------- Edit ----------
  {
    group: "edit",
    label: "CapCut Desktop",
    url: "capcut://",
    note: "open locally · apply cordelia_grade_v1",
    fallback: "Open CapCut from your Start menu",
  },
  {
    group: "edit",
    label: "Uppbeat",
    url: "https://uppbeat.io/",
    note: "free music · cinematic / classical",
  },

  // ---------- Post ----------
  {
    group: "post",
    label: "TikTok",
    url: "https://www.tiktok.com/@cordelia.cult",
    note: "primary · 3 posts/day",
  },
  {
    group: "post",
    label: "Instagram",
    url: "https://www.instagram.com/cordelia.cult",
    note: "reels · 2/day",
  },
  {
    group: "post",
    label: "YouTube",
    url: "https://www.youtube.com/@cordelia.cult",
    note: "shorts · 2/day",
  },
  {
    group: "post",
    label: "Pinterest",
    url: "https://www.pinterest.co.uk/cordeliacult/",
    note: "long-tail · 3–5 pins/day",
  },

  // ---------- Hub ----------
  {
    group: "hub",
    label: "Linktree",
    url: "https://linktr.ee/cordeliacult",
    note: "bio link",
  },
  {
    group: "hub",
    label: "Gumroad",
    url: "https://cordelia-cult.gumroad.com",
    note: "digital products",
  },
  {
    group: "hub",
    label: "Beehiiv",
    url: "https://thecult.beehiiv.com",
    note: "monthly dispatch",
  },
  {
    group: "hub",
    label: "GH Pages site",
    url: "https://omnifysolutions.github.io/cordelia.cult",
    note: "public landing",
  },

  // ---------- Affiliates ----------
  {
    group: "affiliates",
    label: "Amazon Associates UK",
    url: "https://affiliate-program.amazon.co.uk",
    note: "tier 1 · open",
  },
  {
    group: "affiliates",
    label: "TikTok Shop Affiliate",
    url: "https://affiliate.tiktok.com",
    note: "tier 1 · auto-approves at 1K UK",
  },
  {
    group: "affiliates",
    label: "Awin",
    url: "https://www.awin.com",
    note: "niche brand requests",
  },
  {
    group: "affiliates",
    label: "Impact",
    url: "https://impact.com/creator",
    note: "tier 1",
  },
  {
    group: "affiliates",
    label: "ShareASale",
    url: "https://shareasale.com",
    note: "tier 1",
  },
  {
    group: "affiliates",
    label: "Amazon Influencer UK",
    url: "https://affiliate-program.amazon.co.uk/influencers",
    note: "1K+ followers required",
  },
];
