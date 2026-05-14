# Atividade 4 — Mini zoom manual (ajustado para imagem 183x276)

import cv2

img = cv2.imread('1.jpg')

detalhe1 = img[20:90, 30:120]

detalhe2 = img[90:170, 150:260]

cv2.imshow('Detalhe 1', detalhe1)
cv2.imshow('Detalhe 2', detalhe2)

cv2.imwrite('detalhe_superior.jpg', detalhe1)
cv2.imwrite('detalhe_inferior.jpg', detalhe2)

cv2.waitKey(0)
cv2.destroyAllWindows()