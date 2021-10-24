import cv2
import numpy as np
from skimage import io

img = io.imread(r".\\corgi.jpg")
img1 = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY).astype(float) # Делаем одноканальное изображение. Применяем 
cv2.imshow('doge',img1)
cv2.waitKey(0)

edge_x = cv2.Sobel(img1,cv2.CV_64F,1,0,ksize=3)
edge_y = cv2.Sobel(img1,cv2.CV_64F,0,1,ksize=3)    
edge = np.sqrt(edge_x**2 + edge_y**2)    

cv2.imwrite("out.jpg", edge)