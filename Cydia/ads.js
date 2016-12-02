var ud;
if (typeof cydia == 'undefined')
    ud = Math.random();
else
    ud = parseInt(cydia.device.substring(0, 8), 16) / 0x100000000;

var udr = function(l, r) {
    return (ud - l) / (r - l);
};

var udc = function(v, c) {
    return Math.floor(v * c);
};

var uds = function(v, p) {
    v = Math.floor(v * p);
    return v * v % p * v % p / p;
};

var model, firmware;
if (typeof cydia != 'undefined') {
    model = cydia.model;
    firmware = cydia.firmware;
}

var modelish;
if (typeof model == 'undefined')
    modelish = 'iDevice';
else
    modelish = model.match(/^[a-zA-Z]*/)[0];

var cyAdTextJailbreakCon = function() {
    var messages = [
        "meet devs & jailbreakers",
        "learn to make extensions",
        "much better than Twitter",
        //"probably better than IRC",
        //"learn from saurik/rpetrich",
        //"pod2g's hacking workshop",
    ];

    return "June 20-21 San Francisco\n" + messages[Math.floor(Math.random() * messages.length)];
};

var cyAdFilterCyDialer = function() {
    if (!model.match(/^iP(hone|od)/) || !firmware.match(/^[2345]/))
        return false;
    return true;
};

var cyAdFilterUnrestrictor = function() {
    return ud >= 0.10;
};

var cyAdFilterBarrel = function() {
    if (model.match(/^(iPhone1|iPod[12]),/))
        return false;
    return ud >= 0.05 && ud < 0.95;
};

var cyAdFilterZephyr = function() {
    if (model.match(/^(iPhone1|iPod[12]),/) || !firmware.match(/^[56]/))
        return false;
    return ud < 0.90;
};

var cyAdFilterBars = function() {
    return !!model.match(/^(iPhone|iPad(1|[23],[23]))/) && !!firmware.match(/^[234567]/);
};

var cyAdFilterCyntact = function() {
    return !!firmware.match(/^[23456]/);
};

var cyAdFilterFlash = function() {
    return !!firmware.match(/^[23456]/);
};


// 0xFEF3 0xF4AF 0x3322B71 0x39B32F1
var cyAdTextUnrestrictor = function() {
    return "trick WiFi-only apps\niOS 7, LTE supported";
};

// 0x3D06BB9 0x3B02D09 0x3A58921
var cyAdTextBarrel = function() {
    var messages = [
        "curl, whirl, and fade through icons\nfun home screen page transitions",
        "curl, whirl, and fade through icons\nnow fully iOS 9.0 compatible",
    ];

    return messages[Math.floor(Math.random() * 2)];
};

// 0x329076B 0x3260255
var cyAdTextZephyr = function() {
    var messages = [
        "never use the home button again\n(critical if that button is broken)",
        "known for improved multi-tasking\nalso can peek at notification center",
    ];

    return messages[Math.floor(Math.random() * 2)];
};


var cyGotIntelliAd = false;

var cyAdUseIntelli = function() {
    if (!cyGotIntelliAd) {
        cyGotIntelliAd = true;
        localStorage.setItem('v0:intelliborn_ad_offset_0', cyAdCatalogIntelli.index.toString());
    }
};


var cyAdCatalogFeatured = { ads: [
    { dpkg: "cyntact", name: "Cyntact", text: "show pictures in contact lists\nupdated with iOS 6.1 support", filter: cyAdFilterCyntact, },
    { dpkg: "com.phoenix.bars", name: "Bars", text: "signal strength is too subtle to fully\nappreciate with just five fixed-size bars", filter: cyAdFilterBars, },
    //{ dpkg: "org.herf.flux", name: "f.lux", text: "change screen color balance at night to\nmatch the warm hue of indoor lighting", },
    { dpkg: "springflash", name: "SpringFlash", text: "rapid flashlight access\ncustomizable activation", filter: cyAdFilterFlash, },
], check: true, };

var cyAdCatalogSaurikIT = { ads: [
], check: true, };

var cyAdCatalogCydia = { ads: [
    //{ href: "http://www.jailbreakcon.com/", name: "JailbreakCon", text: cyAdTextJailbreakCon, icon: "/icon/jailbreakcon.png", },
    { dpkg: "com.aaronash.barrel", name: "Barrel", text: cyAdTextBarrel, filter: cyAdFilterBarrel, },
    { dpkg: "com.chpwn.zephyr", name: "Zephyr", text: cyAdTextZephyr, filter: cyAdFilterZephyr, },
    { dpkg: "cydialer", name: "CyDialer", text: "slide to call your contacts\nright from your lockscreen", filter: cyAdFilterCyDialer, },
    { dpkg: "com.kstreich-dev.3gunrestrictor5", name: "3G Unrestrictor", text: cyAdTextUnrestrictor, filter: cyAdFilterUnrestrictor, },
], check: true, };

var cyAdCatalogIntelli = { ads: [
     { dpkg: "com.mywi4", name: "MyWi 8", text: "WiFi hotspot with advanced features\nincluding WiFi sharing and 5 GHz", icon: "/icon/com.intelliborn.mywi6.png", },
     { dpkg: "com.intelliscreenx", name: "IntelliScreenX", text: "Twitter, Facebook, Mail, &\nMessages on lock screen", icon: "/icon/com.intelliborn.intelliscreenx6.png", },
     //{ dpkg: "com.intelliborn.messagesplus", name: "Messages+", text: "messages quick compose\nreply to texts from any app", icon: "/icon/com.intelliborn.messagesplus6.png", },
     { dpkg: "com.intelliborn.intelliid", name: "IntelliID", text: "Caller ID for unknown numbers\n(for USA only)", },
     { dpkg: "com.my3g", name: "My3G", text: "FaceTime, YouTube & more on 3G\nworks on LTE, easy configuration", },
    //{ dpkg: "com.mywi4.ondemand", name: "MyWi OnDemand", text: "iPad to iPhone\nInternet sharing", icon: "/icon/com.intelliborn.mywi6.png", },
], check: false, use: cyAdUseIntelli, };


cyAdCatalogFeatured.start = Math.floor(Math.random() * cyAdCatalogFeatured.ads.length);
cyAdCatalogCydia.start = Math.floor(Math.random() * cyAdCatalogCydia.ads.length);
cyAdCatalogSaurikIT.start = Math.floor(Math.random() * cyAdCatalogSaurikIT.ads.length);

var start = localStorage.getItem('v0:intelliborn_ad_offset_0');
cyAdCatalogIntelli.start = start == null ? 0 : parseInt(start) % cyAdCatalogIntelli.ads.length;

cyAdCatalogs = {
    'featured': cyAdCatalogFeatured,
    'saurikit': cyAdCatalogSaurikIT,
    'cydia': cyAdCatalogCydia,
    'intelliborn': cyAdCatalogIntelli,
};

for (var catalog in cyAdCatalogs) {
    catalog = cyAdCatalogs[catalog];
    catalog.index = catalog.start;
    catalog.failed = catalog.index == catalog.ads.length;
};


var cyGetAd = function(catalog) {
    catalog = cyAdCatalogs[catalog];
    if (!catalog)
        return null;

    for (;;) {
        if (catalog.failed)
            return null;

        var index = catalog.index;
        var ad = catalog.ads[index];

        index = (index + 1) % catalog.ads.length;
        catalog.index = index;
        if (index == catalog.start)
            catalog.failed = true;

        if (typeof cydia != 'undefined') {
            var filter = ad.filter;
            if (typeof filter != 'undefined')
                if (!filter())
                    continue;
        }

        delete ad.filter;

        if (typeof ad.dpkg != 'undefined') {
            if (catalog.check && typeof cydia != "undefined" && typeof cydia.getPackageById != "undefined") {
                var package = cydia.getPackageById(ad.dpkg);
                if (package != null && package.installed != null)
                    continue;
            }

            if (typeof ad.href == 'undefined')
                ad.href = 'http://cydia.saurik.com/package/' + ad.dpkg;
            if (typeof ad.icon == 'undefined')
                ad.icon = "/icon/" + ad.dpkg + ".png";
        } else if (cyAdVersion < 1)
            continue;

        if (typeof ad.href == 'function')
            ad.href = ad.href();
        if (typeof ad.icon == 'function')
            ad.icon = ad.icon();
        if (typeof ad.text == 'function')
            ad.text = ad.text();

        if (catalog.use)
            catalog.use();

        return ad;
    }
};

if (typeof cyAdVersion == 'undefined')
    var cyAdVersion = 0;
cyRenderAds();
