# Atividade 5 — Reprodução de vídeo

import cv2

video = cv2.VideoCapture('video.mp4')

while True:
    check, frame = video.read()
    if not check:
        print("Vídeo finalizado")
        break

    cv2.imshow('Reproducao de Video', frame)

    if cv2.waitKey(25) & 0xFF == ord('q'):
        break

video.release()