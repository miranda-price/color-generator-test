// Color Picker

// setup
let color1 = '#fff';
let color2 = '#fff';
let color3 = '#fff';
let color4 = '#fff';
let color5 = '#fff';
    
const colorBox1 = document.getElementById('color-1');
const colorBox2 = document.getElementById('color-2');
const colorBox3 = document.getElementById('color-3');
const colorBox4 = document.getElementById('color-4');
const colorBox5 = document.getElementById('color-5');

let colorRadio = '';
let patternRadio = '';

const getGuidelines = function() {
    colorRadio = document.forms["color_picker"]["primary_color"].value;
    patternRadio = document.forms["color_picker"]["palette_pattern"].value;
}

// hsl to rgb converter
/*
split into two functions
debug color conversion
6 digits for all, not 5
right color
*/
const hslConvert = function (h, s, l) {
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
remove color 2 from constants
adjust color order/function
refine selection? combine sections?

hue breakdown
red 0-20, 334-360 46
orange 20-44 24
yellow 45-74 39
green 75-159 84
blue 160-259 99
violet 260-314 54
pink 315-334 19
*/

const generatePalette = function(color, pattern) {
    // generate primary color
    let primary = Math.floor(Math.random()*25);
    if (color === 'red') {
        primary = primary+350;
    } else if (color === 'orange') {
        primary += 20;
    } else if (color === 'green') {
        primary += 108;
    } else if (color === 'yellow') {
        primary = Math.floor(primary/3) + 50;
    } else if (color === 'blue') {
        primary += 208;
    } else if (color === 'purple') {
        primary += 273;
    } else if (color === 'pink') {
        primary += 313;
    } else {
        primary = Math.floor(Math.random()*360);
    }

    //calculate palette constants
    let saturation = (Math.floor(Math.random()*55))+25
    let light1 = (Math.floor(Math.random()*15))+77;
    let light2 = (Math.floor(Math.random()*30))+25;
    color2 = `hsl(${primary}, ${saturation}%, ${light2}%)`;
    document.getElementById('label-2').innerHTML = hslConvert(primary, saturation, light2);

    // calculate accents
    if(pattern === 'monochromatic') {
        let saturation2 = (Math.floor(Math.random()*15))+80;
        color1 = `hsl(${primary}, ${saturation}%, ${light1}%)`;
        document.getElementById('label-1').innerHTML = hslConvert(primary, saturation, light1);
        color3 = `hsl(${primary}, ${saturation2}%, ${light1-25}%)`;
        document.getElementById('label-3').innerHTML = hslConvert(primary, saturation2, light1-25);
        color4 = `hsl(${primary}, ${((saturation+saturation2)/2)+5}%, ${light2+15}%)`;
        document.getElementById('label-4').innerHTML = hslConvert(primary, ((saturation+saturation2)/2)+5, light2+15);
        color5 = `hsl(${primary}, ${((saturation+saturation2)/2)+5}%, ${light1-5}%)`;
        document.getElementById('label-5').innerHTML = hslConvert(primary, ((saturation+saturation2)/2)+5, light1-5);
    } else if(pattern === 'complementary') {
        let saturation2 = (Math.floor(Math.random()*15))+80;
        let secondary = (primary+180);
        color1 = `hsl(${primary}, ${saturation}%, ${light1}%)`;
        document.getElementById('label-1').innerHTML = hslConvert(primary, saturation, light1);
        color3 = `hsl(${secondary}, ${saturation}%, ${light1-25}%)`;
        document.getElementById('label-3').innerHTML = hslConvert(secondary, saturation, light1-25);
        color4 = `hsl(${primary}, ${saturation2}%, ${light2+5}%)`;
        document.getElementById('label-4').innerHTML = hslConvert(primary, saturation2, light2+5);
        color5 = `hsl(${secondary}, ${saturation2}%, ${light2+5}%)`;
        document.getElementById('label-5').innerHTML = hslConvert(secondary, saturation2, light2+5);
    } else if(pattern === 'triadic') {
        let saturation2 = (Math.floor(Math.random()*15))+80;
        let secondary = (primary+120);
        let tertiary = (secondary+120);
        color1 = `hsl(${secondary}, ${saturation}%, ${light1}%)`;
        document.getElementById('label-1').innerHTML = hslConvert(secondary, saturation, light1);
        color3 = `hsl(${tertiary}, ${saturation}%, ${light1-25}%)`;
        document.getElementById('label-3').innerHTML = hslConvert(tertiary, saturation, light1-25);
        color4 = `hsl(${secondary}, ${saturation2}%, ${light2+5}%)`;
        document.getElementById('label-4').innerHTML = hslConvert(secondary, saturation2, light2+5);
        color5 = `hsl(${tertiary}, ${saturation2}%, ${light2+5}%)`;
        document.getElementById('label-5').innerHTML = hslConvert(tertiary, saturation2, light2+5);
    } else if(pattern === 'analogous') {
        let saturation2 = (Math.floor(Math.random()*15))+80;
        color1 = `hsl(${primary-30}, ${saturation}%, ${light1}%)`;
        document.getElementById('label-1').innerHTML = hslConvert(primary-30, saturation, light1);
        color3 = `hsl(${primary+30}, ${saturation}%, ${light1-25}%)`;
        document.getElementById('label-3').innerHTML = hslConvert(primary+30, saturation, light1-25);
        color4 = `hsl(${primary-60}, ${saturation2}%, ${light2+5}%)`;
        document.getElementById('label-4').innerHTML = hslConvert(primary-60, saturation2, light2+5);
        color5 = `hsl(${primary+60}, ${saturation2}%, ${light2+5}%)`;
        document.getElementById('label-5').innerHTML = hslConvert(primary+60, saturation2, light2+5);
    } else if(pattern === 'split') {
        let saturation2 = (Math.floor(Math.random()*15))+80;
        color1 = `hsl(${primary-150}, ${saturation}%, ${light1}%)`;
        document.getElementById('label-1').innerHTML = hslConvert(primary-150, saturation, light1);
        color3 = `hsl(${primary+150}, ${saturation}%, ${light1-25}%)`;
        document.getElementById('label-3').innerHTML = hslConvert(primary+150, saturation, light1-25);
        color4 = `hsl(${primary-150}, ${saturation2}%, ${light2+5}%)`;
        document.getElementById('label-4').innerHTML = hslConvert(primary-150, saturation2, light2+5);
        color5 = `hsl(${primary+150}, ${saturation2}%, ${light2+5}%)`;
        document.getElementById('label-5').innerHTML = hslConvert(primary+150, saturation2, light2+5);
    } else {
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
    }

    // set color
    colorBox1.style.backgroundColor = color1;
    colorBox2.style.backgroundColor = color2;
    colorBox3.style.backgroundColor = color3;
    colorBox4.style.backgroundColor = color4;
    colorBox5.style.backgroundColor = color5;
}

const display = function() {
    getGuidelines();
    if (colorRadio != '' && patternRadio != '') {
        generatePalette(colorRadio, patternRadio);
    }
}