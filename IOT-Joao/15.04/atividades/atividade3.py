# Atividade 3 — Recorte simples (ajustado para imagem 183x276)

import cv2

img = cv2.imread('1.jpg')

recorte1 = img[20:100, 30:150]

recorte2 = img[80:160, 120:250]

cv2.imshow('Recorte 1', recorte1)
cv2.imshow('Recorte 2', recorte2)

cv2.imwrite('recorte1.jpg', recorte1)
cv2.imwrite('recorte2.jpg', recorte2)

cv2.waitKey(0)
cv2.destroyAllWindows()