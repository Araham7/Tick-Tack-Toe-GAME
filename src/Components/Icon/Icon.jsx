// Hand-drawn X / O marks. pathLength=1 ki wajah se CSS se "pen se likhne" wala animation hota hai.
function Icon({ name, ghost = false }) {
  if (name !== "X" && name !== "O") return null;
  const cls = `mark mark-${name.toLowerCase()} ${ghost ? "ghost" : ""}`;

  return (
    <svg className={cls} viewBox="0 0 100 100" aria-hidden="true">
      {name === "X" ? (
        <>
          <path pathLength="1" d="M24 22 C 40 40, 58 60, 78 80" />
          <path pathLength="1" className="second" d="M77 23 C 60 40, 42 60, 23 79" />
        </>
      ) : (
        <path
          pathLength="1"
          d="M52 19 C 73 17, 84 34, 82 52 C 80 72, 64 84, 47 82 C 27 80, 16 64, 18 45 C 20 28, 35 19, 58 22"
        />
      )}
    </svg>
  );
}

export default Icon;
