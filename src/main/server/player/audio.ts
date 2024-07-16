import * as alt from 'alt-server';
import { useNative } from './native.js';
import { Events } from '@Shared/events/index.js';
import { useWebview } from './webview.js';
import { uid } from '@Shared/utility/index.js';

export function useAudio(player: alt.Player) {
    const native = useNative(player);
    const webview = useWebview(player);

    function playFrontendSound(audioName: string, audioRef: string) {
        native.invoke('playSoundFrontend', -1, audioName, audioRef, true);
    }

    function playSound(soundPath: string) {
        webview.emit(Events.player.audio.play.local, soundPath);
    }

    function playSpatialAudio(soundPath: string, position: alt.Vector3, distance: number, identifier?: string) {
        if (!identifier) {
            identifier = uid.generate();
        }
        webview.emit(Events.player.audio.play.spatial, soundPath, position, distance, identifier);
    }

    return {
        playFrontendSound,
        playSound,
        playSpatialAudio,
    };
}
