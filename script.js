// Color Picker

// setup
let color1 = [0, 0, 0];
let color2 = [0, 0, 0];
let color3 = [0, 0, 0];
let color4 = [0, 0, 0];
let color5 = [0, 0, 0];
    
const colorBox1 = document.getElementById('color-1');
const colorBox2 = document.getElementById('color-2');
const colorBox3 = document.getElementById('color-3');
const colorBox4 = document.getElementById('color-4');
const colorBox5 = document.getElementById('color-5');

var colorRadio, patternRadio, lightRadio, lightMode, darkMode;

const getGuidelines = function() {
    colorRadio = document.forms["color_picker"]["primary_color"].value;
    patternRadio = document.forms["color_picker"]["palette_pattern"].value;
    lightRadio = document.forms["color_picker"]["light_dark"].value;

    if(lightRadio === "light") {
        light = true;
        dark = false;
    } else {
        light = false;
        dark = true;
    }
}

// hsl to rgb converter
const hslConvert = function (hsl) {
    const h = hsl[0];
    const s = hsl[1];
    const l = hsl[2];
    const c = (1 - Math.abs((2*(l/100))-1)) * (s/100);
    const x = c * (1-Math.abs(((h/60)%2)-1));
    const m = (l/100) - (c/2);

    var r, g, b;

    if (0<=h && h<60) {
        r = c;
        g = x;
        b = 0;
    } else if (60<=h && h<120) {
        r = x;
        g = c;
        b = 0;
    } else if (120<=h && h<180) {
        r = 0;
        g = c;
        b = x;
    } else if (180<=h && h<240) {
        r = 0;
        g = x;
        b = c;
    }  else if (240<=h && h<300) {
        r = x;
        g = 0;
        b = c;
    } else {
        r = c;
        g = 0;
        b = x;
    }

    r = (Math.round((r + m)*255)).toString(16);
    g = (Math.round((g + m)*255)).toString(16);
    b = (Math.round((b + m)*255)).toString(16);

    let hexFinal = "#"+r+g+b;
    return hexFinal.toUpperCase();
}

/*
check for contrast ratio
adjust color order/function
*/

const generatePalette = function(color, pattern) {
    // generate primary color
    var primary, secondary, tertiary; 
    let satHigh = Math.floor(Math.random()*20)+65;
    let satLow = Math.floor(Math.random()*20)+15;
    let satMed = Math.floor(Math.random()*20)+40; 
    let lightHigh = Math.floor(Math.random()*20)+65;
    let lightLow = Math.floor(Math.random()*20)+15; 
    let lightMed = Math.floor(Math.random()*20)+40;

    if (color === 'red') {
        primary = Math.floor(Math.random()*20) + 360;
    } else if (color === 'orange') {
        primary = Math.floor(Math.random()*10) + 20;
    } else if (color === 'green') {
        primary = Math.floor(Math.random()*50) + 90;
    } else if (color === 'yellow') {
        primary = Math.floor(Math.random()*20) + 40;
    } else if (color === 'teal') {
        primary = Math.floor(Math.random()*20) + 150;
    } else if (color === 'blue') {
        primary = Math.floor(Math.random()*70) + 180;
    } else if (color === 'purple') {
        primary = Math.floor(Math.random()*30) + 270;
    } else if (color === 'pink') {
        primary = Math.floor(Math.random()*20) + 310;
    } else {
        primary = Math.floor(Math.random()*360);
    }

    // calculate palettes
    if(pattern === 'monochromatic') {

        if(light) {
            color1 = hslConvert([primary, Math.floor(Math.random()*10), lightHigh]);
            color2 = hslConvert([primary, satMed, lightLow]);
            color3 = hslConvert([primary, satHigh, lightMed]);
            color4 = hslConvert([primary, satLow, lightMed]);
            color5 = hslConvert([primary, satLow, lightHigh]);
        }

        if(dark) {
            color1 = hslConvert([primary, Math.floor(Math.random()*10), lightLow]);
            color2 = hslConvert([primary, satLow, lightHigh]);
            color3 = hslConvert([primary, satMed, lightHigh]);
            color4 = hslConvert([primary, satMed, lightMed]);
            color5 = hslConvert([primary, satHigh, lightMed]);
        }
    } 
    
    else if(pattern === 'complementary') {
        secondary = primary+180
        if(light) {
            color1 = hslConvert([primary, Math.floor(Math.random()*10), lightHigh]);
            color2 = hslConvert([primary, satMed, lightLow]);
            color3 = hslConvert([secondary, satMed, lightHigh]);
            color4 = hslConvert([secondary, satLow, lightMed]);
            color5 = hslConvert([primary, satLow, lightMed]);
        }

        if(dark) {
            color1 = hslConvert([primary, Math.floor(Math.random()*10), lightLow]);
            color2 = hslConvert([primary, satHigh, lightHigh]);
            color3 = hslConvert([secondary, satHigh, lightHigh]);
            color4 = hslConvert([secondary, satLow, lightMed]);
            color5 = hslConvert([primary, satLow, lightMed]);
        }
    } 
    
    /*else if(pattern === 'triadic') {
        let saturation2 = (Math.floor(Math.random()*15))+80;
        let secondary = (primary+120);
        let tertiary = (secondary+120);
        color1 = [primary, saturation, light1];
        document.getElementById('label-1').innerHTML = color1;
        color3 = [primary,saturation2, light1-25];
        document.getElementById('label-3').innerHTML = color3;
        color4 = [primary, ((saturation+saturation2)/2)+5, light2+15];
        document.getElementById('label-4').innerHTML = color4;
        color5 = [primary, ((saturation+saturation2)/2)+5,light1-5];
        document.getElementById('label-5').innerHTML = color5;
    } 
    
    else if(pattern === 'analogous') {
        let saturation2 = (Math.floor(Math.random()*15))+80;
        color1 = [primary, saturation, light1];
        document.getElementById('label-1').innerHTML = color1;
        color3 = [primary,saturation2, light1-25];
        document.getElementById('label-3').innerHTML = color3;
        color4 = [primary, ((saturation+saturation2)/2)+5, light2+15];
        document.getElementById('label-4').innerHTML = color4;
        color5 = [primary, ((saturation+saturation2)/2)+5,light1-5];
        document.getElementById('label-5').innerHTML = color5;
    } 
    
    else if(pattern === 'split') {
        let saturation2 = (Math.floor(Math.random()*15))+80;
        color1 = [primary, saturation, light1];
        document.getElementById('label-1').innerHTML = color1;
        color3 = [primary,saturation2, light1-25];
        document.getElementById('label-3').innerHTML = color3;
        color4 = [primary, ((saturation+saturation2)/2)+5, light2+15];
        document.getElementById('label-4').innerHTML = color4;
        color5 = [primary, ((saturation+saturation2)/2)+5,light1-5];
        document.getElementById('label-5').innerHTML = color5;
    } 
    
    else {
        color1 = `#fff`;
        document.getElementById('label-1').innerHTML = '#FFFFFF';
        color2 = `#fff`;
        document.getElementById('label-2').innerHTML = '#FFFFFF';
        color3 = `#fff`;
        document.getElementById('label-3').innerHTML = '#FFFFFF';
        color4 = `#fff`;
        document.getElementById('label-4').innerHTML = '#FFFFFF';
        color5 = `#fff`;
        document.getElementById('label-5').innerHTML = '#FFFFFF';
    }*/

    // set color
    colorBox1.style.backgroundColor = color1;
    colorBox2.style.backgroundColor = color2;
    colorBox3.style.backgroundColor = color3;
    colorBox4.style.backgroundColor = color4;
    colorBox5.style.backgroundColor = color5;

    document.getElementById('label-1').innerHTML = color1;
    document.getElementById('label-2').innerHTML = color2;
    document.getElementById('label-3').innerHTML = color3;
    document.getElementById('label-4').innerHTML = color4;
    document.getElementById('label-5').innerHTML = color5;
}

const display = function() {
    getGuidelines();
    if (colorRadio != '' && patternRadio != '') {
        generatePalette(colorRadio, patternRadio);
    }
}