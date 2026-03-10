let interestMapping = {
  Technology: 0,
  Lifestyle: 0,
  Science: 0,
  ArtDesign: 0,
  Finance: 0,
  Gaming: 0
};

function applyTagsToProfile(tags) {
  if (tags.includes("Technology")) interestMapping.Technology += 15;
  if (tags.includes("Lifestyle")) interestMapping.Lifestyle += 15;
  if (tags.includes("Science")) interestMapping.Science += 10;
}

function normalizeProfile() {
  const total = Object.values(interestMapping).reduce((a,b)=>a+b,1);
  return Object.fromEntries(
    Object.entries(interestMapping).map(([k,v])=>[k, v/total*100])
  );
}
