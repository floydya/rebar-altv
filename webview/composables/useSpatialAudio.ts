import { Events } from '../../src/main/shared/events';
import { SpatialAudioOptions } from '../../src/main/shared/types/spatialAudio.js';
import { useEvents } from './useEvents.js';
import { usePlayerStats } from './usePlayerStats.js';
const events = useEvents();
const playerStats = usePlayerStats();

let isInitialized = false;
let audioContext: AudioContext;
let convolver: ConvolverNode;

const panners: Map<string, {
    audio: typeof Audio,
    panner: typeof PannerNode,
}> = new Map();

export function useSpatialAudio() {
    if (!isInitialized) {
        isInitialized = true;
        events.on(Events.player.audio.play.spatial, play);
        audioContext = new AudioContext();
        convolver = audioContext.createConvolver();
    }

    async function play(path: string, options: SpatialAudioOptions) {
        const panner = new PannerNode(audioContext, {
            panningModel: 'HRTF',
            distanceModel: 'linear',
            positionX: options.position.x,
            positionY: options.position.z,
            positionZ: options.position.y,
            orientationX: 0,
            orientationY: 0,
            orientationZ: 0,
            refDistance: 1,
            maxDistance: options.distance ?? 50.0,
            rolloffFactor: 1,
            coneInnerAngle: 0,
            coneOuterAngle: 0,
            coneOuterGain: 0.3,
        });
        const audio = new Audio(path);
        audio.volume = options.volume ?? 0.03;
        audio.loop = options.isLooped ?? false;
        const track = audioContext.createMediaElementSource(audio);
        track.connect(panner);
        track.connect(audioContext.destination);
        audio.play();
    }

    return {
        play,
    };
}
