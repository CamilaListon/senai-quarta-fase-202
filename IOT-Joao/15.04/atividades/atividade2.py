# Atividade 2 — Salvar cópia de uma imagem

import cv2
import os

if not os.path.exists('Saida'):
    os.makedirs('Saida')

img = cv2.imread('1.jpg')

cv2.imwrite('Saida/copia.jpg', img)

print("Imagem salva com sucesso na pasta Saida/")