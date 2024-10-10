'use client';
import { Mic, Stop } from '@mui/icons-material';
import { LoadingButton, LoadingButtonProps } from '@mui/lab';
import { useState, useEffect, useCallback, useRef } from 'react';

interface RecorderProps {
  onRecordSuccess?: (audio: Blob) => void;
  onRecordError?: () => void;
  buttonProps?: LoadingButtonProps;
  audioMIMEType?: string;
}

/**
 * Composant permettant d'enregistrer des audios par le biais du micro du navigateur
 * @param {RecorderProps}
 * @returns {JSX.Element}
 */
export default function Recorder({
  onRecordSuccess,
  onRecordError,
  buttonProps,
  audioMIMEType = 'audio/mpeg',
}: RecorderProps): JSX.Element {
  const [recording, setRecording] = useState<boolean>(false);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null,
  );
  const [audioStream, setAudioStream] = useState<MediaStream | null>(null);

  // Utilisation d'un tableau mutable pour stocker les audio chunks
  const audioChunksRef = useRef<Blob[]>([]);

  const stopBrowserRecord = useCallback(() => {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop();
    }
    if (audioStream) {
      audioStream.getTracks().forEach((track) => track.stop());
    }
  }, [mediaRecorder, audioStream]);

  const handleClick = async () => {
    if (recording) {
      stopBrowserRecord();
      setRecording(false);
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      setAudioStream(stream);
      const recorder = new MediaRecorder(stream);

      audioChunksRef.current = []; // Réinitialiser les chunks à chaque nouvel enregistrement

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data); // Mettre à jour directement la référence
        }
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: audioMIMEType,
        });
        if (onRecordSuccess) onRecordSuccess(audioBlob);
        setRecording(false); // Réinitialise l'état d'enregistrement
      };

      recorder.start();
      setMediaRecorder(recorder);
      setRecording(true);
    } catch (error) {
      console.error('Recorder error', error);
      if (onRecordError) onRecordError();
    }
  };

  useEffect(() => {
    return () => stopBrowserRecord();
  }, [stopBrowserRecord]);

  return (
    <LoadingButton onClick={handleClick} {...buttonProps}>
      {recording ? <Stop /> : <Mic />}
    </LoadingButton>
  );
}
