const ClientVersion = 'Beta0.4';

function createButton(text, onclickFunction) {
    var button = document.createElement('button');
    button.className = 'widebtn';
    button.textContent = text;
    button.onclick = onclickFunction;
    return button;
}
const CONFIG = {
    childList: true,
    attributes: true,
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
        const boshu_observer = new MutationObserver();
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

var LoginData = localStorage.getItem('LoginData');
if (LoginData) {
    LoginData = JSON.parse(LoginData);
} else {
    LoginData = [""];
}   

var targetValues = localStorage.getItem('targetValues');
if (targetValues) {
    targetValues = JSON.parse(targetValues);
} else {
    targetValues = ["1"];
}

var storedTargetsID = localStorage.getItem('targetsID');
if (storedTargetsID) {
    targetsID = JSON.parse(storedTargetsID);
} else {
    targetsID = ["1"];
}

function createPopup() {
    var popup = document.createElement('div');
    popup.className = 'custom-popup';
    popup.style.width = '300px';
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
    versionText.textContent = ClientVersion;
    versionText.style.position = 'absolute';
    versionText.style.bottom = '10px';
    versionText.style.color = 'blue';
    versionText.style.left = '10px';
    popup.appendChild(versionText);

    var closeButton = createButton('閉じる', function() {
        document.body.removeChild(popup);
    });

    var update = createButton('アップデート情報', function() {
        alert('アップデート情報です\nBeta0.1(Closed)\nボタンの追加等。機能は0でしたｗ\nBeta0.2(Open)\nブログ検索、募集欄から特定の人物を消す機能を追加\nBeta0.3(Open)\nタイムラインのユーザー指定機能を追加\nBeta0.4(Open)\nBlockDisabler(テスト版)を追加\n\n次回アプデはいちいちプロフィールに行かなくてもIP確認できる機能を追加する予定です(；・ω・)');
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

    var ProfileButton = createButton('BlockDisabler(テスト版)', function() {
        var lastLoginData = localStorage.getItem('lastLoginData');
        var initialValue = lastLoginData ? lastLoginData.split(' ') : LoginData;
        var inputValues = prompt('アカウントのIDとパスワードをスペースで区切って入力。使用しない場合は空欄', initialValue.join(' '));
        if (inputValues !== null) {
            var values = inputValues.split(' ').map(value => value.trim());
            var id = values[0];
            var password = values[1];
            if (id && password) {
                localStorage.setItem('userID', id);
                localStorage.setItem('userPassword', password);
                localStorage.setItem('lastLoginData', inputValues);
                alert('IDとパスワードが保存されました。');
            } else {
                alert('IDとパスワードの入力が不完全です。');
            }
        }
    });

    var Setumei = createButton('BlockDisablerについて', function() {
        alert('BlockDisablerとは、文字通りブロックを回避する機能です(現在プロフィールのみ)\nBlockDisabler(テスト版)というボタンを押すと文字入力画面が出ますので、アカウントのログインIDとパスワードをスペースで区切って入力してください。\n※以下注意\nタイムライン、ブログ等がまだ表示されません。気が向いたらやります。\nまた、仮実装中のため最適化が全くといいほどされていません\n例：ブロックしてる人に足跡つけるたびにLoginPHPを叩くため足跡つけ過ぎると404で死ぬ、上記の通り毎回LoginPHP叩いてるため表示が遅い\n最適化頑張ります・・・\nBy開発者');
    });


    popup.appendChild(Setumei);
    popup.appendChild(ProfileButton);
    popup.appendChild(closeButton);
    popup.appendChild(BlogButton);
    popup.appendChild(BosyuButton);
    popup.appendChild(update);

    document.body.appendChild(popup);

    closeButton.style.position = 'absolute';
    closeButton.style.top = '10px';
    closeButton.style.right = '10px';

    BlogButton.style.position = 'absolute';
    BlogButton.style.top = '50%';
    BlogButton.style.left = '30%';
    BlogButton.style.transform = 'translate(-50%, -50%)';

    update.style.position = 'absolute';
    update.style.bottom = '10px';
    update.style.left = '200px';
    update.style.transform = 'translate(-50%, -50%)';

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

var TimlineObserver = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        mutation.addedNodes.forEach(function(node) {
            if (node.nodeType === 1) {
                var categoryElements = node.querySelectorAll('.category');
                categoryElements.forEach(function(categoryElement) {
                    if (categoryElement.textContent === '自分のみ') {
                        var newLabel = document.createElement('label');
                        newLabel.className = 'radio01';
                        newLabel.setAttribute("onclick", "var userID = document.getElementById('userIDInput').value; if (userID) LoadTimelineList(userID, 1, 0, '#co_mytimelinelist')" );

                        var newInput = document.createElement('input');
                        newInput.type = 'radio';
                        newInput.name = 'mytlbtn';
                        newInput.value = '2';

                        var newSpan = document.createElement('span');
                        newSpan.className = 'category';
                        newSpan.textContent = '　指定　';

                        var textBox = document.createElement('input');
                        textBox.type = 'text';
                        textBox.placeholder = 'IDを入力';
                        textBox.id = 'userIDInput';

                        newLabel.appendChild(newInput);
                        newLabel.appendChild(newSpan);

                        categoryElement.closest('label').insertAdjacentElement('afterend', newLabel);
                        newLabel.insertAdjacentElement('afterend', textBox);
                    }
                });
            }
        });
    });
});
var numbersOnly

function filterNumbers(str) {
    return str.replace(/\D/g, '');
}

function decodeUnicode(str) {
    return str.replace(/\\u[\dA-F]{4}/gi, function(match) {
        return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
    });
}


var ProfileObserver = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        mutation.addedNodes.forEach(async function(node) {
            if (node.classList && node.classList.contains('co_profilewindow')) {
                var elements = node.querySelectorAll('.profile_blockp')
                elements.forEach(async function(element) {
                    var profileUserId = document.querySelector('.profile_userid')
                    if (profileUserId) {
                        numbersOnly = filterNumbers(profileUserId.textContent.trim())
                        console.log(numbersOnly);
                        var elements = document.getElementsByClassName("layer_userwindow")


                        var userID = localStorage.getItem('userID');
                        var userPassword = localStorage.getItem('userPassword');

                        const loginResponse = await fetch('https://himachat.jp/entrance.php?mode=entry', {
                            method: 'GET',
                            credentials: 'include'
                          });
                          
                          let loginData = await loginResponse.text();
                          if (loginData.charCodeAt(0) === 0xFEFF) {
                            loginData = loginData.slice(1);
                          }
                          
                          const loginJson = JSON.parse(loginData);
                          const mysession = loginJson.mysession;
                          const myid = loginJson.myuid;

                          const loginParams = new URLSearchParams();
                          loginParams.append("marumie", myid);
                          loginParams.append("mysession", mysession);
                          loginParams.append("fid", userID);
                          loginParams.append("fpass",userPassword );
                          loginParams.append("hkey", "null");
                          
                          await fetch('https://himachat.jp/community/top_Login.php', {
                            method: 'POST',
                            body: loginParams,
                          });
                          

                          const formData = new FormData();
                          formData.append("marumie", myid);
                          formData.append("mysession", mysession);
                          formData.append("layerid", "61");
                          formData.append("word", numbersOnly);
                          formData.append("type", "2");
                          
                        await fetch("https://himachat.jp/community/profile_Serch.php", {
                            method: "POST",
                            body: formData
                        })
                        .then(response => response.text())
                        .then(data => {

                            var decodedString = decodeUnicode(data);

                            decodedString = decodedString.replace(/\\r/g, '\r')
                                .replace(/\\n/g, '\n')
                                .replace(/\\t/g, '\t')
                                .replace(/\\\//g, '/')
                                .replace(/\\>/g, '>')
                                .replace(/\\</g, '<');

                                console.log(decodedString);

                                const htmlString = decodedString;
    

                                const nameRegex = /<h4>(.*?)<\/h4>/;
                                const nameMatch = htmlString.match(nameRegex);
                                const name = nameMatch ? nameMatch[1] : '';
                                console.log(name)
    

                                const profileRegex = /<div class='profile'>(.*?)<\/div>/;
                                const profileMatch = htmlString.match(profileRegex);
                                const profile = profileMatch ? profileMatch[1] : '';
                                console.log(profile)
    

                                const ageAndGenderRegex = /(-?\d+)\u6b73 (\S+)\s(.+)\u3000\u53cb\u4eba\uff1a(\d+)\u4eba/;
                                const ageAndGenderMatch = profile.match(ageAndGenderRegex);
                                const age = ageAndGenderMatch ? ageAndGenderMatch[1] : '';
                                const gender = ageAndGenderMatch ? ageAndGenderMatch[2] : '';
                                const location = ageAndGenderMatch ? ageAndGenderMatch[3] : '';
                                const friendCount = ageAndGenderMatch ? ageAndGenderMatch[4] : '';
                                console.log(age,gender,location,friendCount)
    

                                const messageRegex = /<div class='hitokoto'>([\s\S]*?)<\/div>/;
                                const messageMatch = htmlString.match(messageRegex);
                                let message = messageMatch ? messageMatch[1] : '';

                                message = message.replace(/\\r\\n/g, '<br>').replace(/\\n/g, '<br>');

                                const popupHTML = `
                                <div class="layer layer_userwindow" id="layer69" style="position: absolute; top: 90px; left: 551.5px;">
                                    <div class="sourcespace">
                                        <span class="profile_userid">ユーザーID${numbersOnly}<button class="nazekakikanai" onclick="CopyBtn(this,120966)">コピー</button></span>
                                        <span class="profile_kanribtn astylenormal" onclick="UserKanri(120966)">管理</span>
                                        <div class="co_profilewindow">
                                            <div class="profile_name">${name}</div>
                                            <div class="profile_sexage">${gender}(${age})　${location}</div>
                                            <div class="profile_img"><img class="noimg" src="icon/nofriend.png" style="width:100%;height:100%;"></div>
                                            <div class="profile_hitokoto">${message}</div>
                                            <div class="profile_friendcount">${friendCount}人が友人になっています</div>
                                        </div>
                                        <div class="profile_nofrienddiv">
                                            <div class="nofrienddiv_sinseispace">
                                                <button onclick="myclose(this);myopen(this.parentNode,&quot;.sw1&quot;);">フレンド申請</button>
                                                <small class="sw1" style="display:none">一言添えられます</small><br>
                                                <textarea class="sw1 friendsinsei_appeal" rows="3" cols="40" style="display:none"></textarea>
                                                <button class="sw1" style="display:none" onclick="myclose(this.parentNode,&quot;.sw1&quot;);myopen(this.parentNode,&quot;.sw2&quot;);FriendSinsei(${numbersOnly},this.parentNode);">申込む！</button>
                                                <span class="sw2" style="display:none">フレンド申請しました</span>
                                            </div>
                                        </div>
                                    </div>
                                    <button onclick="myremove('.layer_userwindow')" class="layerclosebtn">×</button>

                                </div>
                                `;

                                
    
                                document.body.insertAdjacentHTML('beforeend', popupHTML);
                            })
                            .catch(error => console.error(error));
                        }
                    });
                }
            });
        });
    });
    
ProfileObserver.observe(document.body, {
    childList: true,
    subtree: true
});



TimlineObserver.observe(document.body, {
    childList: true,
    subtree: true
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