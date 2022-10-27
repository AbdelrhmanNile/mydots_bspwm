/**
 * @name BetterMediaPlayer
 * @displayName BetterMediaPlayer
 * @author unknown81311_&_Doggybootsy
 * @authorLink https://betterdiscord.app/plugin?id=377
 * @source https://github.com/unknown81311/BetterMediaPlayer
 * @updateUrl https://raw.githubusercontent.com/unknown81311/BetterMediaPlayer/main/BetterMediaPlayer.plugin.js
 * @invite yYJA3qQE5F
 */

/*@cc_on
@if (@_jscript)
    // Offer to self-install for clueless users that try to run this directly.
    var shell = WScript.CreateObject("WScript.Shell")
    var fs = new ActiveXObject("Scripting.FileSystemObject")
    var pathPlugins = shell.ExpandEnvironmentStrings("%APPDATA%\BetterDiscord\plugins")
    var pathSelf = WScript.ScriptFullName
    // Put the user at ease by addressing them in the first person
    shell.Popup("It looks like you've mistakenly tried to run me directly. \n(Don't do that!)", 0, "I'm a plugin for BetterDiscord", 0x30)
    if (fs.GetParentFolderName(pathSelf) === fs.GetAbsolutePathName(pathPlugins)) {
        shell.Popup("I'm in the correct folder already.", 0, "I'm already installed", 0x40)
    } else if (!fs.FolderExists(pathPlugins)) {
        shell.Popup("I can't find the BetterDiscord plugins folder.\nAre you sure it's even installed?", 0, "Can't install myself", 0x10)
    } else if (shell.Popup("Should I copy myself to BetterDiscord's plugins folder for you?", 0, "Do you need some help?", 0x34) === 6) {
        fs.CopyFile(pathSelf, fs.BuildPath(pathPlugins, fs.GetFileName(pathSelf)), true)
        // Show the user where to put plugins in the future
        shell.Exec("explorer " + pathPlugins)
        shell.Popup("I'm installed!", 0, "Successfully installed", 0x40)
    }
    WScript.Quit()
@else@*/
module.exports = (() => {
    const config = {
        info: {
            name: "Better  Media Player",
            authors: [
                {
                    name: "unknown81311",
                    discord_id: "359174224809689089",
                    github_username: "unknown81311"
                },
                {
                    name: "Doggybootsy",
                    discord_id: "515780151791976453",
                    github_username: "Doggybootsy"
                }
            ],
            version: "1.2.3",
            description: "Add more features to the media player in discord",
            github: "https://github.com/unknown81311/BetterMediaPlayer",
            github_raw: "https://raw.githubusercontent.com/unknown81311/BetterMediaPlayer/main/BetterMediaPlayer.plugin.js"
        },
        changelog: [
            {
                title: "Removed",
                type: "improved",
                items: ["Remove accidental window function"]
            }
        ],
        defaultConfig: [
            {
                type: "video", 
                name: "Preview",
                note: "If the demo doesnt update just hover/click the demo"
            },
            {
                type: "category",
                id: "category_Loop",
                name: "Loop button",
                collapsible: true,
                shown: false,
                settings: [
                    {
                        type: "switch",
                        id: "button_loop",
                        name: "Add a Loop button",
                        note: "Loop videos in a simple click",
                        value: true,
                    },
                    {
                        type: 'slider',
                        id: 'position_loop',
                        name: 'Position for loop',
                        note: 'Move the loop button to different spots',
                        value: 1,
                        markers: [0, 1, 2, 3, 4, 5],
                        stickToMarkers: true
                    },
                    {
                        type: "switch",
                        id: "auto_loop",
                        name: "Automatically loop videos",
                        note: "Loop videos w/o clicking a button",
                        value: true,
                    }
                ]
            },
            {
                type: "category",
                id: "category_PIP",
                name: "Picture In Picture button",
                collapsible: true,
                shown: false,
                settings: [
                    {
                        type: "switch",
                        id: "PIP",
                        name: "Add a PIP button",
                        note: "Picture In Picture in a simple click",
                        value: true
                    },
                    {
                        type: 'slider',
                        id: 'position_PIP',
                        name: 'Position for PIP',
                        note: 'Move the PIP button to different spots',
                        value: 1,
                        markers: [0, 1, 2, 3, 4, 5],
                        stickToMarkers: true
                    },
                    {
                        type: "switch",
                        id: "top_mid_PIP",
                        name: "Move the PIP to the middle",
                        note: "Breaks audio until the player is reloaded",
                        value: false
                    },
                ]
            },
            {
                type: "category",
                id: "category_misc",
                name: "Miscellaneous",
                collapsible: true,
                shown: false,
                settings: [
                    {
                        type: "switch",
                        id: "min_width",
                        name: "Set minimum width to video",
                        note: "So the video bar can show",
                        value: true,
                    },
                    {
                        type: "switch",
                        id: "hide_cursor",
                        name: "Hide the cursor when the controls are hidden",
                        value: false,
                    }
                ]
            },
            {
                type: "category",
                id: "category_skipping",
                name: "Fast forward and Rewind -- DOESNT WORK YET ™",
                collapsible: true,
                shown: false,
                settings: [
                    {
                        type: "switch",
                        id: "fast_forward_switch",
                        name: "Fast forwad",
                        value: true
                    },
                    {
                        type: "KeybindRecorder",
                        id: "fast_forward_keybind",
                        name: "Fast forwad keybind",
                        value: [
                            [
                                0,
                                80
                            ]
                        ],
                    },
                    {
                        type: "NumberInputStepper",
                        id: "fast_forward",
                        name: "Fast forwad amount",
                        note: "How many seconds to fast forwad by",
                        value: 5
                    },
                    {
                        type: "switch",
                        id: "rewind_switch",
                        name: "Rewind",
                        value: true
                    },
                    {
                        type: "KeybindRecorder",
                        id: "rewind_keybind",
                        name: "Rewind keybind",
                        value: [
                            [
                                0,
                                79
                            ]
                        ],
                    },
                    {
                        type: "NumberInputStepper",
                        id: "rewind",
                        name: "Rewind amount",
                        note: "How many seconds to rewind by",
                        value: 5
                    },
                ]
            },
        ]
    }
    return !global.ZeresPluginLibrary ? class {
        constructor() { this._config = config }
        load() {
            const {alert, saveData, loadData, showConfirmationModal} = BdApi
            // Let Lightcord users still use but with warning
            if(window.Lightcord || window.LightCord && !loadData(config.info.name.replace(' ',''), "ShownLightcordWarning")) {
                alert("Attention!", "By using LightCord you are risking your Discord Account, due to using a 3rd Party Client. Switch to an official Discord Client (https://discord.com/) with the proper BD Injection (https://betterdiscord.app/)")
                saveData(config.info.name.replace(' ',''), "ShownLightcordWarning", true)
            }
            showConfirmationModal("Library plugin is needed", [`The library plugin neede∂d for ${config.info.name} is missing. Please click Download Now to install it.`], {
                confirmText: "Download",
                cancelText: "Cancel",
                onConfirm: () => {
                    require("request").get("https://rauenzi.github.io/BDPluginLibrary/release/0PluginLibrary.plugin.js", async (error, response, body) => {
                    if (error) return require("electron").shell.openExternal("https://betterdiscord.app/Download?id=9")
                    await new Promise(r => require("fs").writeFile(require("path").join(Plugins.folder, "0PluginLibrary.plugin.js"), body, r))})
                }
            })
        }
        start() {}
        stop() {}
    } : (([Plugin, Api]) => {
        const plugin = (Plugin, Api) => {
            const {WebpackModules, Settings: {SettingField}, Patcher: {after, unpatchAll}, DiscordModules: {React: {createElement}}} = Api
            const {alert, saveData, injectCSS, loadData, showConfirmationModal, Plugins: {get}} = BdApi
            const {error} = console
            const loop = "Loop"
            const PIP = "PIP"
            const {controlIcon, videoControls, wrapperControlsHidden} = WebpackModules.getByProps('video','videoControls')
            const _videoControls = `.${videoControls}:not(.${loop})`
            const imageWrapper = WebpackModules.getByProps('imageWrapper').imageWrapper
            const videoWrapper = WebpackModules.getByProps('video','wrapper').wrapper
            const Controls = WebpackModules.getByProps("Controls").Controls.prototype
            const _KeybindRecorder = WebpackModules.getByDisplayName("KeybindRecorder")
            const MediaPlayer = WebpackModules.findByDisplayName("MediaPlayer").prototype
            const ChannelMessage = WebpackModules.find(m => m?.type?.displayName === "ChannelMessage")
            const _NumberInputStepper = WebpackModules.getByDisplayName("NumberInputStepper")
            const getCurrentUser = WebpackModules.getByProps("getCurrentUser")
            //Spoof channel
            const Message = WebpackModules.getByPrototypes("addReaction")
            const Channel = WebpackModules.getByPrototypes("isGroupDM")
            const Timestamp = WebpackModules.getByProps("isMoment")
            const SpoofChannel = new Channel({
                channel_id: "-7",
                name: "Better Media Player"
            })
            // Collection of Urls played in the demo
            const demo_urls = [
                "credit to whoever posted these",
                {
                    filename: "ae.mp4",
                    id:         "870091678302744586",
                    url:        "https://cdn.discordapp.com/attachments/620279569265721381/870091678302744586/video0_21.mp4",
                    proxy_url:  "https://media.discordapp.net/attachments/620279569265721381/870091678302744586/video0_21.mp4",
                    height:     480,
                    width:      480
                },
                {
                    filename: "Arch user speedrun.mp4",
                    id:         "872790856120287232",
                    proxy_url:  "https://media.discordapp.net/attachments/754981916402515969/872790856120287232/video0-68.mp4",
                    url:        "https://cdn.discordapp.com/attachments/754981916402515969/872790856120287232/video0-68.mp4",
                    height:     225,
                    width:      400
                },
                {
                    filename: "Dancing duck.mp4",
                    id:         "866825574100762624",
                    proxy_url:  "https://media.discordapp.net/attachments/86004744966914048/866825574100762624/duck.mp4",
                    url:        "https://cdn.discordapp.com/attachments/86004744966914048/866825574100762624/duck.mp4",
                    height:     300,
                    width:      209
                },
                {
                    filename: "BD Changelog video concept.mp4",
                    id:         "862043845989761024",
                    proxy_url:  "https://media.discordapp.net/attachments/86004744966914048/862043845989761024/b0cs2x.mp4",
                    url:        "https://cdn.discordapp.com/attachments/86004744966914048/862043845989761024/b0cs2x.mp4",
                    height:     225,
                    width:      400
                },
                {
                    filename: "Not a rick roll.mp4",
                    id:         "873334284814020648",
                    proxy_url:  "https://media.discordapp.net/attachments/800235887149187096/873334284814020648/video0.mov",
                    url:        "https://cdn.discordapp.com/attachments/800235887149187096/873334284814020648/video0.mov",
                    height:     225,
                    width:      400
                },
                {
                    filename: "Try it and see.mp4",
                    id:         "755137518210384013",
                    proxy_url:  "https://media.discordapp.net/attachments/754981916402515969/755137518210384013/try_it_and_see.mp4",
                    url:        "https://cdn.discordapp.com/attachments/754981916402515969/755137518210384013/try_it_and_see.mp4",
                    height:     225,
                    width:      400},
                {
                    filename: "Cat dance.mp4",
                    id:         "799802803958448148",
                    proxy_url:  "https://media.discordapp.net/attachments/754981916402515969/799802803958448148/broo.mp4",
                    url:        "https://cdn.discordapp.com/attachments/754981916402515969/799802803958448148/broo.mp4",
                    height:     300,
                    width:      300
                }
            ]
            // Get the number
            const demo_url_num = Math.floor(Math.random() * Object.keys(demo_urls).pop() + 1)
            // Make the message
            const SpoofMessage = new Message({
                author: getCurrentUser.getCurrentUser(),
                timestamp: Timestamp(),
                channel_id: "-7",
                content: "Thanks Strencher#1044 for the demo",
                attachments: [
                    {
                        content_type: "video/mp4",
                        size: Math.random().toString().slice(2, 9),
                        filename: demo_urls[demo_url_num].filename,
                        id: demo_urls[demo_url_num].id,
                        url: demo_urls[demo_url_num].url,
                        proxy_url: demo_urls[demo_url_num].proxy_url,
                        height: demo_urls[demo_url_num].height,
                        width: demo_urls[demo_url_num].width
                    }
                ]
            })
            // I do not know whats happening here, but it all works
            // Video react element
            class VideoField extends SettingField {
                constructor(name, note, onChange) {
                    super(name, note, onChange, props => createElement(ChannelMessage, props), {
                        channel: SpoofChannel,
                        message: SpoofMessage
                    })
                }
            }
            // Number Input
            class NumberInputStepper extends SettingField {
                constructor(name, note, value, onChange, saveSettings) {
                    super(name, note, onChange, props => createElement(_NumberInputStepper, {...props, onChange: _.flow(onChange, saveSettings), value}), {})
                }
            }
            // Keybind
            class KeybindRecorder extends SettingField {
                constructor(name, note, value, onChange, saveSettings) {
                    super(name, note, onChange, props => createElement(_KeybindRecorder, {...props, onChange: _.flow(onChange, saveSettings), value}), {
                        defaultValue: value,
                        value: value
                    })
                }
            }
            return class BetterMediaPlayer extends Plugin {
                constructor(props) {
                    super(props)
                }
                onStart() {
                    try {
                        // Let Lightcord users still use but with warning
                        if(window.Lightcord || window.LightCord && !loadData(config.info.name.replace(' ',''), "ShownLightcordWarning")) {
                            alert("Attention!", "By using LightCord you are risking your Discord Account, due to using a 3rd Party Client. Switch to an official Discord Client (https://discord.com/) with the proper BD Injection (https://betterdiscord.app/)")
                            saveData(config.info.name.replace(' ',''), "ShownLightcordWarning", true)
                        }
                        this.patching("start")
                        this.css("start")
                    } catch (error) {this.error(error)}
                }
                onStop() {
                    if(document.pictureInPictureElement) document.exitPictureInPicture()
                    this.patching("stop")
                    this.css("stop")
                }
                observer() {
                    try {
                        if(this.settings.category_Loop.auto_loop === true && document.querySelector(_videoControls)) {
                            // Doing
                            for(const ite of document.querySelectorAll(_videoControls)) {
                                ite.classList.add(loop)
                                // Adding loop
                                if(ite.previousSibling.loop === false) ite.previousSibling.loop = true
                                // Adding class to loop button
                                for (const ele of ite.childNodes) if(ele.id === loop && ele.classList == controlIcon) ele.classList.add('active')
                            }
                        }
                        if (document.querySelector(`[note="${config.defaultConfig[0].note}"]`)){
                            document.querySelector(`[note="${config.defaultConfig[0].note}"]`).parentNode.parentNode.parentNode.classList.add("BetterMediaPlayer__settings")
                            document.querySelector(`[note="${config.defaultConfig[0].note}"]`).removeAttribute("title")
                        }
                    } catch (error) {
                        this.error(error)
                    }
                }
                getSettingsPanel() {
                    const panel = this.buildSettingsPanel()
                    panel.addListener(() => {
                        this.patching()
                        this.css()
                    })
                    return panel.getElement()
                }
                buildSetting(data) {
                    const {name, note, type, value, onChange, id} = data
                    if (type == "NumberInputStepper") return new NumberInputStepper(name, note, value, onChange, () => {this.saveSettings()})
                    if (type == "video") return new VideoField(name, note, onChange, {})
                    if (type == "KeybindRecorder") return new KeybindRecorder(name, note, value, onChange, () => {this.saveSettings()})
                    return super.buildSetting(data)
                }
                css(mode) {
                    if(mode == "start") {
                        injectCSS(config.info.name.replace(' ','').replace(' ','').replace(' ',''),`/* 
    Active button
*/
.${controlIcon}.active{
    color: var(--brand-experiment)}
/* Video demo */
/* 
    Settings
    - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    BetterMediaPlayers settings
*/
#app-mount [note="${config.defaultConfig[0].note}"]{
    border: var(--scrollbar-thin-thumb) 1px solid;
    background-color: var(--background-message-hover);
    padding-top: .25rem;
    padding-bottom: .25rem;
    border-radius: 6px}/*
.plugin-form-container.BetterMediaPlayer__settings .plugin-input-group:last-child .plugin-inputs{
    display: grid;
    grid-gap: 10px;
    grid-template: "a d""b e""c f"}
.plugin-form-container.BetterMediaPlayer__settings .plugin-input-group:last-child .plugin-inputs > .plugin-input-container:nth-child(1){
    grid-area: a}
.plugin-form-container.BetterMediaPlayer__settings .plugin-input-group:last-child .plugin-inputs > .plugin-input-container:nth-child(2){
    grid-area: b}
.plugin-form-container.BetterMediaPlayer__settings .plugin-input-group:last-child .plugin-inputs > .plugin-input-container:nth-child(3){
    grid-area: c}
.plugin-form-container.BetterMediaPlayer__settings .plugin-input-group:last-child .plugin-inputs > .plugin-input-container:nth-child(4){
    grid-area: d}
.plugin-form-container.BetterMediaPlayer__settings .plugin-input-group:last-child .plugin-inputs > .plugin-input-container:nth-child(5){
    grid-area: e}
.plugin-form-container.BetterMediaPlayer__settings .plugin-input-group:last-child .plugin-inputs > .plugin-input-container:nth-child(6){
    grid-area: f}*/${this.settings.category_misc.min_width == true ? `
/* 
    Set minimum width to video
    - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    This will only show if \`Set minimum width to video\` is true 
*/
.${imageWrapper}:not(a) > .${videoWrapper}, .${imageWrapper}:not(a){
    min-width: calc(266px + ${this.settings.category_PIP.PIP == true ? '32px' : '0'} + ${this.settings.category_Loop.button_loop === true ? '32px' : '0'})}
/* End */` : ``}${this.settings.category_PIP.top_mid_PIP == true ? `
/* 
    Top middle PIP icon
    - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    This will only show if \`Move the PIP to the middle\` is true 
*/
#${PIP}{
    position: absolute;
    top: 40px;
    left: 50%;
    transform: translatex(-50%);
    z-index: 1;
    background-color: rgba(0,0,0,.6);
    border-radius: 25%;
    opacity: .05;
    transition: opacity linear .15s}
#${PIP}:hover, #${PIP}.active{
    opacity: 1}
/* End */` : ``}${this.settings.category_misc.hide_cursor == true ? `
/* 
    Hide the cursor when the controls are hidden
    - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    This will only show if \`Hide the cursor when the controls are hidden\` is true 
*/
.${wrapperControlsHidden.replace(' ', '.')}{
    cursor: none}` : '' }`)
                    }
                    else {
                        if(mode == "stop" && document.getElementById(config.info.name.replace(' ','').replace(' ','').replace(' ','')))
                            document.getElementById(config.info.name.replace(' ','').replace(' ','').replace(' ','')).remove()
                        else {
                            this.css("stop")
                            this.css("start")
                        }
                    }
                }
                patching(mode) {
                    if(mode === "start") {
                        // Start
                        this.patching("stop")
                        if(this.settings.category_PIP.PIP === true) {
                            const data = {
                                splice: this.settings.category_PIP.top_mid_PIP === true ? 1 : this.settings.category_PIP.position_PIP,
                                width: 16,
                                height: 16,
                                viewBox: "0 0 24 24",
                                path: {
                                    1: {
                                        d: 'M0 0h24v24H0V0z'
                                    },
                                    2: {
                                        fill: "currentColor",
                                        d: 'M19 11h-8v6h8v-6zm4 8V4.98C23 3.88 22.1 3 21 3H3c-1.1 0-2 .88-2 1.98V19c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2zm-2 .02H3V4.97h18v14.05z'
                                    }
                                }
                            }
                            this.patcher(PIP, data, this.settings.category_PIP.top_mid_PIP === true ? MediaPlayer : Controls)
                        }
                        if(this.settings.category_Loop.button_loop === true) {
                            const data = {
                                splice: this.settings.category_Loop.position_loop,
                                width: 16,
                                height: 16,
                                viewBox: "-5 0 459 459.648",
                                path: {
                                    1: {
                                        fill: "currentColor",
                                        d: 'm416.324219 293.824219c0 26.507812-21.492188 48-48 48h-313.375l63.199219-63.199219-22.625-22.625-90.511719 90.511719c-6.246094 6.25-6.246094 16.375 0 22.625l90.511719 90.511719 22.625-22.625-63.199219-63.199219h313.375c44.160156-.054688 79.945312-35.839844 80-80v-64h-32zm0 0'
                                    },
                                    2: {
                                        fill: "currentColor",
                                        d: 'm32.324219 165.824219c0-26.511719 21.488281-48 48-48h313.375l-63.199219 63.199219 22.625 22.625 90.511719-90.511719c6.246093-6.25 6.246093-16.375 0-22.625l-90.511719-90.511719-22.625 22.625 63.199219 63.199219h-313.375c-44.160157.050781-79.949219 35.839843-80 80v64h32zm0 0'
                                    }
                                }
                            }
                            this.patcher(loop, data, Controls)
                        }
                    } 
                    else{
                        // Stop
                        if (mode === "stop") unpatchAll()
                        else {
                            // Settings
                            this.patching("stop")
                            this.patching("start")
                        }
                    }
                }
                patcher(type, data, modu) {
                    try {
                        after(modu, "render", (thisObject, _, res) => {
                            // not do sounds
                            if (res.props.className.endsWith(videoWrapper) || res.props.className === videoControls) {
                                res.props.children.splice(data.splice, 0, 
                                    createElement("svg", {
                                        onClick: (e) => {
                                            // Weird issue 
                                            if (e.target.id == PIP) this.picture_picture(e.target)
                                            else {
                                                if (e.target.id == loop) this.loop(e.target)
                                                else {
                                                    if (e.target.parentNode.id == PIP) this.picture_picture(e.target.parentNode)
                                                    else {
                                                        if (e.target.parentNode.id == loop) this.loop(e.target.parentNode)
                                                        else this.error('If something happened idk')
                                                    }
                                                }
                                            }       
                                        },
                                        width: 16,
                                        height: 16,
                                        viewBox: data.viewBox,
                                        class: controlIcon,
                                        id: type,
                                        children: [
                                            createElement("path", {
                                                fill: data.path[1].fill === undefined ? 'transparent' : data.path[1].fill,
                                                d: data.path[1].d
                                            }),
                                            createElement("path", {
                                                fill: data.path[2].fill === undefined ? 'transparent' : data.path[2].fill,
                                                d: data.path[2].d
                                            })
                                        ]
                                    })
                                )
                            }
                        }
                    )}
                    catch (error) {
                        this.error(error)
                    }
                }
                loop(node) {
                    try {
                        node.classList.toggle('active')
                        node.parentNode.previousSibling.loop = node.parentNode.previousSibling.loop === false ? true : false
                    } catch (error) {
                        this.error(error)
                    }
                }
                picture_picture(node) {
                    try {
                        if(this.settings.category_PIP.top_mid_PIP === true) {
                            if(document.pictureInPictureElement) document.exitPictureInPicture()
                            else node.nextSibling.requestPictureInPicture()
                            node.classList.toggle('active')
                            node.nextSibling.addEventListener('leavepictureinpicture', leavepip)
                            function leavepip() {
                                if(node.classList.contains('active')) node.classList.remove('active')
                                node.nextSibling.removeEventListener('leavepictureinpicture', leavepip)
                            }
                        } 
                        else {
                            if(document.pictureInPictureElement) document.exitPictureInPicture()
                            else node.parentNode.previousSibling.requestPictureInPicture()
                            node.classList.toggle('active')
                            node.parentNode.previousSibling.addEventListener('leavepictureinpicture', leavepip)
                            function leavepip() {
                                if(node.classList.contains('active')) node.classList.remove('active')
                                node.parentNode.previousSibling.removeEventListener('leavepictureinpicture', leavepip)
                            }
                        }
                    } catch(e){this.error(e)}
                }
                error(e) {
                    error(e)
                    showConfirmationModal(`An error accord with ${config.info.name}`, 
                        [
                            "Wan't to reload discord?",
                            "If this is recurring please make a issue on the github page.",
                            `Join the support server https://discord.gg/${get("BetterMediaPlayer").invite}`,
                            `\`\`\`js\n${e}\n\`\`\``
                        ], {
                            confirmText: "Reload",
                            cancelText: "Cancel",
                            onConfirm: () => location.reload()
                        }
                    )
                }
            }
        }
        return plugin(Plugin, Api)
    })(global.ZeresPluginLibrary.buildPlugin(config))
})()
/*@end@*/
