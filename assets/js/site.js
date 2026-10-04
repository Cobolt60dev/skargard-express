// ---------------------------------------------------------------------------------------------
// Fill these in before publishing (see PUBLISHING.md). Everything else on the site reads them.
// ---------------------------------------------------------------------------------------------
window.SKARGARD = {
  // The shared link to the test build's zip (Google Drive, OneDrive, Dropbox, itch.io...).
  // Leave it empty and the download buttons say the link is on its way.
  downloadUrl: "https://drive.google.com/file/d/1eM6h0cAuMgQ5By76hZKsAQ__65OojNdX/view?usp=sharing",
  downloadFile: "SkargardExpress_TestBuild_2026-10-04.zip",
  downloadSize: "5.75 GB",
  build: "Test build 0.1.0 (4 October 2026)",
  // Where testers report bugs and send feedback: this repository's issues page
  // (https://github.com/cobolt60dev/skargard-express/issues/new/choose), or a Google Form.
  feedbackUrl: "https://github.com/cobolt60dev/skargard-express/issues/new/choose",
};

// ---- Download and feedback links ----
document.addEventListener("DOMContentLoaded", () => {
  const cfg = window.SKARGARD;

  document.querySelectorAll("[data-download]").forEach((a) => {
    if (cfg.downloadUrl) {
      a.href = cfg.downloadUrl;
      a.setAttribute("rel", "noopener");
    } else {
      a.removeAttribute("href");
      a.setAttribute("aria-disabled", "true");
      const label = a.querySelector("[data-label]") || a;
      label.textContent = "Download link coming soon";
    }
  });
  document.querySelectorAll("[data-feedback]").forEach((a) => {
    if (cfg.feedbackUrl) {
      a.href = cfg.feedbackUrl;
      a.setAttribute("rel", "noopener");
    } else {
      a.removeAttribute("href");
      a.setAttribute("aria-disabled", "true");
      a.textContent = "Feedback link coming soon";
    }
  });
  document.querySelectorAll("[data-build]").forEach((el) => { el.textContent = cfg.build; });
  document.querySelectorAll("[data-size]").forEach((el) => { el.textContent = cfg.downloadSize; });
  document.querySelectorAll("[data-file]").forEach((el) => { el.textContent = cfg.downloadFile; });

  // ---- Screenshot lightbox ----
  const dialog = document.querySelector("dialog.lightbox");
  const shots = [...document.querySelectorAll(".gallery button")];
  if (!dialog || shots.length === 0) {
    return;
  }
  const img = dialog.querySelector("img");
  const caption = dialog.querySelector("p");
  let index = 0;
  const show = (i) => {
    index = (i + shots.length) % shots.length;
    const button = shots[index];
    img.src = button.dataset.full;
    img.alt = button.querySelector("img").alt;
    caption.textContent = button.querySelector("figcaption").textContent;
  };
  shots.forEach((button, i) => button.addEventListener("click", () => { show(i); dialog.showModal(); }));
  dialog.querySelector(".close").addEventListener("click", () => dialog.close());
  dialog.querySelector(".prev").addEventListener("click", () => show(index - 1));
  dialog.querySelector(".next").addEventListener("click", () => show(index + 1));
  dialog.addEventListener("click", (e) => { if (e.target === dialog) { dialog.close(); } });
  document.addEventListener("keydown", (e) => {
    if (!dialog.open) { return; }
    if (e.key === "ArrowLeft") { show(index - 1); }
    if (e.key === "ArrowRight") { show(index + 1); }
  });
});
