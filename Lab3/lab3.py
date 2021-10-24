import cv2
import numpy as np
from skimage import io

img = io.imread(r".\\corgi.jpg")
img1 = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

edge_x = cv2.Sobel(img1,cv2.CV_64F,1,0,ksize=3)
edge_y = cv2.Sobel(img1,cv2.CV_64F,0,1,ksize=3)    
edge = np.sqrt(edge_x**2 + edge_y**2)    # image can be normalized to 
                                         # fit into 0..255 color space

cv2.imwrite("out.jpg", edge)