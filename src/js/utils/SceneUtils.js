import { Vector2 } from 'three';
import { SAOPass } from 'three/examples/jsm/postprocessing/SAOPass';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module.js';

let SELECTABLE,
    SHOW,
    isAnimating = false;

let INTERSECTED, SAO = {};
// let SAO         = isMobile ? 1 : 0;

const outlinePassParameters = {
    edgeStrength: 3,
    edgeGlow: 0.0,
    edgeThickness: 1,
    pulsePeriod: 0,
    rotate: false,
    usePatternTexture: false,
};

const SAOparameters = {
    output: 0,
    saoBias: 1,
    saoIntensity: 0.006, // 0.08
    saoScale: 10,
    saoKernelRadius: 75,
    saoMinResolution: 0,
    saoBlur: true,
    saoBlurRadius: 4,
    saoBlurStdDev: 7,
    saoBlurDepthCutoff: 0.0008
};

const removeLoadingScreen = () => {
    const loadingScreen = document.getElementById('loading-screen');

    if (loadingScreen.classList) {
        loadingScreen.classList.add('hidden');
    } else {
        loadingScreen.className += ' hidden';
    }
};

const getAnimating = () => { return isAnimating; };
const setAnimating = bool => { isAnimating = bool; };

const getIntersected = () => { return INTERSECTED; };
const setIntersected = object => { INTERSECTED = object; };

const getSelectable = () => { return SELECTABLE; };
const setSelectable = bool => { SELECTABLE = bool; };

const getPerformanceMonitor = () => { return SHOW; };
const setPerformanceMonitor = bool => { SHOW = bool; };

const getSaoPass = () => { return SAO; };
const setSaoPass = pass => { SAO = pass; };

const initGUI = saoPass => {
    const gui = new GUI();

    gui.add(saoPass.params, 'output', {
        'Beauty'    : SAOPass.OUTPUT.Beauty,
        'Beauty+SAO': SAOPass.OUTPUT.Default,
        'SAO'       : SAOPass.OUTPUT.SAO,
        'Depth'     : SAOPass.OUTPUT.Depth,
        'Normal'    : SAOPass.OUTPUT.Normal
    }).onChange(value => {
        saoPass.params.output = parseInt(value);
    });
    gui.close(true);
    gui.add(saoPass.params, 'saoBias', - 1, 1);
    gui.add(saoPass.params, 'saoIntensity', 0, 1);
    gui.add(saoPass.params, 'saoScale', 0, 10);
    gui.add(saoPass.params, 'saoKernelRadius', 1, 100);
    gui.add(saoPass.params, 'saoMinResolution', 0, 1);
    gui.add(saoPass.params, 'saoBlur');
    gui.add(saoPass.params, 'saoBlurRadius', 0, 200);
    gui.add(saoPass.params, 'saoBlurStdDev', 0.5, 150);
    gui.add(saoPass.params, 'saoBlurDepthCutoff', 0.0, 0.1);
};

const getMouseObject = event => {
    const mouse = new Vector2();

    // calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

    return mouse;
};

export default {
    outlinePassParameters,
    SAOparameters,
    removeLoadingScreen,
    getAnimating,
    setAnimating,
    getIntersected,
    setIntersected,
    getSelectable,
    setSelectable,
    getPerformanceMonitor,
    setPerformanceMonitor,
    getSaoPass,
    setSaoPass,
    initGUI,
    getMouseObject,
};

/*export const setSelectedObject = object => {
    selectedObject = object;
};

export const getSelectedObjectPosition = () => {
    return selectedObject.position;
};

export const sigmoid = x => {
    return 1 / (1 + Math.pow(Math.E, -x));
    // return 1 / (1 + Math.pow(Math.E, -x));
};*/

