// Share button: uses the device share sheet where available, otherwise copies the link.
(function () {
  function shareUrl() {
    var params = new URLSearchParams(window.location.search);
    var target = params.get("share") || params.get("file") || window.location.href;
    return new URL(target, window.location.href).href;
  }
  function toast(message) {
    var el = document.getElementById("shareToast");
    if (!el) {
      el = document.createElement("div");
      el.id = "shareToast";
      document.body.appendChild(el);
    }
    el.textContent = message;
    el.classList.add("show");
    clearTimeout(el._timer);
    el._timer = setTimeout(function () { el.classList.remove("show"); }, 2200);
  }
  function share() {
    var url = shareUrl();
    var title = document.title || "Invisible Injury";
    if (navigator.share) {
      navigator.share({ title: title, url: url }).catch(function () {});
    } else if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(
        function () { toast("Link copied"); },
        function () { window.prompt("Copy this link:", url); }
      );
    } else {
      window.prompt("Copy this link:", url);
    }
  }
  ["shareButton", "secondaryShare"].forEach(function (id) {
    var btn = document.getElementById(id);
    if (btn) btn.addEventListener("click", share);
  });
})();
