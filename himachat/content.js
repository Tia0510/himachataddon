const ClientVersion = 'OpenBeta0.2'



function createButton(text, onclickFunction) {
    var button = document.createElement('button');
    button.className = 'widebtn';
    button.textContent = text;
    button.onclick = onclickFunction;
    return button;
}

const CONFIG = {
    childList: true,
    attribute: true,
    subtree: true
};

const layer_observer = new MutationObserver(stream);
layer_observer.observe(document.getElementById('co_layerroot'), CONFIG);


function stream() {
    if (document.getElementsByClassName('layer layer_yobikomi')[0] != null) {
        const list_observer = new MutationObserver(hide);
        list_observer.observe(document.getElementsByClassName('layer layer_yobikomi')[0], CONFIG);
    }
    if (document.getElementsByClassName('sourcespace')[0] != null) {
        const boshu_observer = new MutationObserver(dispData);
        boshu_observer.observe(document.getElementsByClassName('sourcespace')[0], CONFIG);
    }
}

function hide() {
    const collection = document.getElementsByClassName('yobikomiul');
    const list = Array.prototype.slice.call(collection);
    list.forEach(element => {
        const elemID = element.getAttribute('onclick').replace(/[^0-9]/g, "");
        targetsID.forEach(BosyuTarget => {
            if (elemID == BosyuTarget) {
                element.remove();
            }
        });
    });
}

function createButton(text, onclickFunction) {
    var button = document.createElement('button');
    button.className = 'widebtn';
    button.textContent = text;
    button.onclick = onclickFunction;
    return button;
}

var targetValues = localStorage.getItem('targetValues');
if (targetValues) {
    targetValues = JSON.parse(targetValues);
}

var storedTargetsID = localStorage.getItem('targetsID');
if (storedTargetsID) {
    targetsID = JSON.parse(storedTargetsID);
}

function createPopup() {
    var popup = document.createElement('div');
    popup.className = 'custom-popup';
    popup.style.width = '600px';
    popup.style.height = '250px';
    popup.style.position = 'absolute';
    popup.style.top = '30%';
    popup.style.left = '50%';
    popup.style.transform = 'translate(-50%, -50%)';
    popup.style.backgroundColor = 'white';
    popup.style.border = '1px solid #ccc';
    popup.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.5)';
    popup.style.zIndex = '1';

    
    var versionText = document.createElement('p');
    versionText.textContent = ClientVersion
    versionText.style.position = 'absolute';
    versionText.style.bottom = '10px';
    versionText.style.color = 'blue'
    versionText.style.left = '10px';
    popup.appendChild(versionText);

    var closeButton = createButton('閉じる', function() {
        document.body.removeChild(popup);
    });

    var BlogButton = createButton('ブログ検索', function() {
        var inputValue = prompt('ブログ検索から抹消したい人のIDをスペースで区切って入力', targetValues.join(' '));
        if (inputValue !== null) {
            targetValues = inputValue.split(' ').map(id => id.trim());
            localStorage.setItem('targetValues', JSON.stringify(targetValues));
        }
    });

    var BosyuButton = createButton('募集欄', function() {
        var inputValue = prompt('募集欄から抹消したい人のIDをスペースで区切って入力', targetsID.join(' '));
        if (inputValue !== null) {
            targetsID = inputValue.split(' ').map(id => id.trim());
            localStorage.setItem('targetsID', JSON.stringify(targetsID));
        }

    });

    popup.appendChild(closeButton);
    popup.appendChild(BlogButton);
    popup.appendChild(BosyuButton);

    document.body.appendChild(popup);

    closeButton.style.position = 'absolute';
    closeButton.style.top = '10px';
    closeButton.style.right = '10px';

    BlogButton.style.position = 'absolute';
    BlogButton.style.top = '50%';
    BlogButton.style.left = '30%';
    BlogButton.style.transform = 'translate(-50%, -50%)';

    BosyuButton.style.position = 'absolute';
    BosyuButton.style.top = '50%';
    BosyuButton.style.left = '70%';
    BosyuButton.style.transform = 'translate(-50%, -50%)';
}

function createNewPopup() {
    var newPopup = document.createElement('div');
    newPopup.className = 'custom-popup';
    newPopup.style.width = '400px';
    newPopup.style.height = '200px';
    newPopup.style.position = 'absolute';
    newPopup.style.top = '40%';
    newPopup.style.left = '50%';
    newPopup.style.transform = 'translate(-50%, -50%)';
    newPopup.style.backgroundColor = 'lightblue';
    newPopup.style.border = '1px solid #ccc';
    newPopup.style.boxShadow = '0px 0px 10px rgba(0, 0, 0, 0.5)';
    newPopup.style.zIndex = '2';

    var closeButton = createButton('閉じる', function() {
        document.body.removeChild(newPopup);
    });

    newPopup.appendChild(closeButton);
    document.body.appendChild(newPopup);

    closeButton.style.position = 'absolute';
    closeButton.style.top = '10px';
    closeButton.style.right = '10px';
}

var PopupObserver = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        mutation.removedNodes.forEach(function(node) {
            if (node.id === 'co_etcmenu') {
                var popup = document.querySelector('.custom-popup');
                if (popup) {
                    document.body.removeChild(popup);
                }
            }
        });
    });
});

var ButtonObserver = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        mutation.addedNodes.forEach(function(node) {
            if (node.id === 'co_etcmenu') {
                var parentElement = node.querySelector('.sourcespace');
                var newPasswordButton = createButton('拡張機能設定', function() {
                    createPopup();
                });
                parentElement.appendChild(newPasswordButton);
            }
        });
    });
});

var BlogObserver = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        mutation.addedNodes.forEach(function(node) {
            if (node.classList && node.classList.contains('blogul')) {
                var elements = node.querySelectorAll('span.small_coid');
                elements.forEach(function(element) {
                    if (targetValues.includes(element.textContent.trim().substring(1))) {
                        element.closest('.blogul').remove();
                        return; 
                    }
                });
            }
        });
    });
});

ButtonObserver.observe(document.body, {
    childList: true,
    subtree: true
});

BlogObserver.observe(document.body, {
    childList: true,
    subtree: true
});

PopupObserver.observe(document.body, {
    childList: true,
    subtree: true
});
