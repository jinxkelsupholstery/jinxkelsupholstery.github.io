(function () {
    "use strict";

    var gallery = document.querySelector("[data-gallery]");
    var dialog = document.getElementById("lightbox");
    if (!gallery || !dialog || typeof dialog.showModal !== "function") {
        return;
    }

    var links = Array.prototype.slice.call(gallery.querySelectorAll("a[data-full]"));
    if (!links.length) {
        return;
    }

    var image = dialog.querySelector("img");
    var caption = dialog.querySelector("figcaption");
    var index = 0;

    function show(i) {
        index = (i + links.length) % links.length;
        var link = links[index];
        var figcaption = link.closest("figure").querySelector("figcaption");
        image.src = link.getAttribute("data-full");
        image.alt = link.querySelector("img") ? link.querySelector("img").alt : "";
        caption.textContent = figcaption ? figcaption.textContent.trim() : "";
        dialog.setAttribute("aria-label", caption.textContent || "Photo");
    }

    function open(i) {
        show(i);
        dialog.showModal();
        document.body.classList.add("lb-open");
    }

    function close() {
        dialog.close();
        teardown();
    }

    function teardown() {
        document.body.classList.remove("lb-open");
        image.removeAttribute("src");
    }

    dialog.addEventListener("close", function () {
        teardown();
        links[index].focus();
    });

    dialog.addEventListener("click", function (event) {
        if (event.target.closest("[data-lb]")) {
            var action = event.target.closest("[data-lb]").getAttribute("data-lb");
            if (action === "prev") {
                show(index - 1);
            } else if (action === "next") {
                show(index + 1);
            } else {
                close();
            }
            return;
        }
        if (event.target === dialog) {
            close();
        }
    });

    dialog.addEventListener("keydown", function (event) {
        if (event.key === "ArrowLeft") {
            event.preventDefault();
            show(index - 1);
        } else if (event.key === "ArrowRight") {
            event.preventDefault();
            show(index + 1);
        }
    });

    gallery.addEventListener("click", function (event) {
        var link = event.target.closest("a[data-full]");
        if (!link) {
            return;
        }
        event.preventDefault();
        open(links.indexOf(link));
    });

    if (links.length < 2) {
        dialog.querySelectorAll("[data-lb='prev'], [data-lb='next']").forEach(function (btn) {
            btn.hidden = true;
        });
    }
})();
