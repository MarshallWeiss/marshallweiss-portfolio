/** A miniature of the AI Atlas map: pencil lines, hollow cluster rings and red question marks on paper. */
export default function AtlasArtwork() {
  const ink = "#2a2724", pencil = "#8f887c", sienna = "#9c3d1f";
  const questions: Array<[number, number, string]> = [
    [136, 68, "Is AGI close?"],
    [70, 150, "Taiwan blockade"],
    [214, 128, "Power concentration"],
    [160, 212, "AI and jobs"],
    [262, 236, "AI and learning"],
  ];
  const clusters: Array<[number, number, string]> = [
    [192, 96, "The race"],
    [100, 232, "Work"],
    [240, 176, "The labs"],
  ];
  const lines = [
    "M136 68 C 156 110, 180 120, 214 128",
    "M70 150 C 94 110, 116 90, 136 68",
    "M136 68 C 146 140, 152 180, 160 212",
    "M160 212 C 196 206, 230 220, 262 236",
    "M214 128 C 224 160, 190 190, 160 212",
    "M70 150 C 100 180, 130 200, 160 212",
  ];
  return (
    <svg className="atlas-art" viewBox="0 0 400 300" aria-hidden="true" role="img">
      <rect width="400" height="300" fill="#f2ece0" />
      {lines.map((d) => <path key={d} d={d} fill="none" stroke={ink} strokeWidth=".8" opacity=".55" />)}
      {clusters.map(([x, y, label]) => (
        <g key={label}>
          {questions.slice(0, 2).map(([qx, qy]) => <path key={qx} d={`M${x} ${y} L${qx} ${qy}`} stroke={pencil} strokeWidth=".7" strokeDasharray="1.5 3.5" opacity=".7" />)}
          <circle cx={x} cy={y} r="9" fill="#f2ece0" stroke={ink} strokeWidth=".8" />
          <text x={x + 14} y={y + 4} fill={ink} fontSize="9.5" letterSpacing=".08em" style={{ fontFamily: "Georgia, serif", textTransform: "uppercase" }}>{label}</text>
        </g>
      ))}
      {questions.map(([x, y, label]) => (
        <g key={label}>
          <circle cx={x} cy={y} r="6.5" fill="#f2ece0" stroke={sienna} strokeWidth="1.3" />
          <circle cx={x} cy={y} r="2" fill={sienna} />
          <text x={x + 12} y={y + 5} fill={sienna} fontSize="14" fontWeight="600" style={{ fontFamily: "Georgia, serif" }}>{label}</text>
        </g>
      ))}
    </svg>
  );
}
