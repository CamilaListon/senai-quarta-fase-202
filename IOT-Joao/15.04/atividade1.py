# Atividade 1 — Abertura de imagem

import cv2

img = cv2.imread('1.jpg')

cv2.imshow('Minha Janela de Imagem', img)

img2 = cv2.imread('2.jpg')
cv2.imshow('Segunda Imagem', img2)

cv2.waitKey(0)