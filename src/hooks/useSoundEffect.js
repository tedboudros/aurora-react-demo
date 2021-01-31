import useSound from "use-sound";
import soundConfig from "constants/soundConfig";

const useSoundEffect = (soundID) => {
  const { file, ...config } = soundID ? soundConfig[soundID] : {};
  const [playSound] = useSound(file, { ...config });

  const play = () => {
    if (config.sprite) playSound({ id: soundID });
    else playSound();
  };

  return play;
};

export default useSoundEffect;
