var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        mutation.addedNodes.forEach(function(node) {
            if (node.classList && node.classList.contains('blogul')) {
                var elements = node.querySelectorAll('span.small_coid');
                elements.forEach(function(element) {
                    if (element.textContent.trim() === "85992") {
                        element.closest('.blogul').remove();
                        return; 
                    }
                });
            }
        });
    });
});
observer.observe(document.body, {
    childList: true,
    subtree: true
});
