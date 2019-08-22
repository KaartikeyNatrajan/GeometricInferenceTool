import json
import math
from sympy.geometry import *
import sys
class Angleo(object):
	"""docstring for Angle"""
	def __init__(self, id, value, lLine, rLine):
		self.id = id
		self.value = value
		self.lLine = lLine
		self.rLine = rLine
		self.known = False if (self.value < 0) else True
	def setValue(self, val):
		self.value = val
	def __str__(self):
		return str(self.id)
		
class Pointo(object):
	"""docstring for Point"""
	def __init__(self, label, x, y):
		self.label = label
		self.x = x
		self.y = y
	def __str__(self):
		return "("+self.label+", "+str(self.x)+", "+str(self.y)+")"


class Lineo(object):
	"""docstring for Line"""
	def __init__(self, label, start, end):
		self.label = label
		self.start = start
		self.end = end
		try: self.slope = (self.end.y - self.start.y)/(self.end.x - self.start.x)
		except ZeroDivisionException:
			self.slope = 1j
		self.intercept= ((self.start.y)-(self.slope * self.start.x))
	def __str__(self):
		return self.label+": "+str(self.start)+", "+str(self.end)


def pointCheck(a, b):
	return a.x == b.x and a.y == b.y

def angleexist(l1, l2):
	count = 0
	for ang in [a for a in angles if ((a.lLine==l1 or a.rLine==l1)and(a.lLine==l2 or a.rLine==l2)) ] :
		count = count + 1
	if (count==0):
		return True
	else:
		return False


def triangleFinder2(lines):
	mint = 1000
	for l1 in lines:
		for l2 in [a for a in lines if ( (pointCheck(a.start, l1.start) or pointCheck(a.start, l1.end) or pointCheck(a.end, l1.start) or pointCheck(a.end, l1.end)) and (a!=l1))]:
			if ((angleexist(l1, l2))):
				continue

			if (pointCheck(l2.start, l1.start)):
				if (l2.start.y < l2.end.y):
					if (l2.slope > 0):
					
						l2endnewx = mint
						l2endnewy = l2endnewx * l2.slope + l2.intercept
					else:
						l2endnewx = -mint
						l2endnewy = l2endnewx * l2.slope + l2.intercept

				elif (l2.start.y > l2.end.y):
					if (l2.slope > 0):
					
						l2endnewx = -mint
						l2endnewy = l2endnewx * l2.slope + l2.intercept
					else:
						l2endnewx = mint
						l2endnewy = l2endnewx * l2.slope + l2.intercept

				if (l1.start.y < l1.end.y):
					if (l1.slope > 0):
						l1endnewx = mint
						l1endnewy = l1endnewx * l1.slope + l1.intercept
					else:
						l1endnewx = -mint
						l1endnewy = l1endnewx * l1.slope + l1.intercept
				elif (l1.start.y > l1.end.y):
					if (l1.slope > 0):
						l1endnewx = -mint
						l1endnewy = l1endnewx * l1.slope + l1.intercept
					else:
						l1endnewx = mint
						l1endnewy = l1endnewx * l1.slope + l1.intercept
				x2 = Polygon(Point(l2.start.x, l2.start.y), Point(l1.end.x, l1.end.y), Point(l2.end.x, l2.end.y))
				x1 = Polygon(Point(l2.start.x, l2.start.y), Point(l1endnewx, l1endnewy), Point(l2endnewx, l2endnewy))
				for y in range(0, len(points)):
				 	if (x1.encloses_point(points[y]) and points[y]!=Point(l1.end.x, l1.end.y) and points[y]!=Point(l2.end.x, l2.end.y)) :
				 		if ( ( ( ptwl[y].y + 2 > (ptwl[y].x * l1.slope + l1.intercept) ) and ( ptwl[y].y - 2 < (ptwl[y].x * l1.slope + l1.intercept) ) ) or ( ( ptwl[y].y + 2 > (ptwl[y].x * l2.slope + l2.intercept) ) and ( ptwl[y].y - 2 < (ptwl[y].x * l2.slope + l2.intercept) ) )):
				 			continue
				 		for ang1 in [ x for x in angles if ((x.lLine==l1 and x.rLine==l2) or (x.lLine==l2 and x.rLine == l1) ) ]:
				 			angles.remove(ang1)
			elif (pointCheck(l2.start, l1.end)):
				if (l2.start.y < l2.end.y):
					if (l2.slope > 0):
					
						l2endnewx = mint
						l2endnewy = l2endnewx * l2.slope + l2.intercept
					else:
						l2endnewx = -mint
						l2endnewy = l2endnewx * l2.slope + l2.intercept

				elif (l2.start.y > l2.end.y):
					if (l2.slope > 0):
					
						l2endnewx = -mint
						l2endnewy = l2endnewx * l2.slope + l2.intercept
					else:
						l2endnewx = mint
						l2endnewy = l2endnewx * l2.slope + l2.intercept

				if (l1.start.y < l1.end.y):
					if (l1.slope > 0):
						l1startnewx = -mint
						l1startnewy = l1startnewx * l1.slope + l1.intercept
					else:
						l1startnewx = mint
						l1startnewy = l1startnewx * l1.slope + l1.intercept
				elif (l1.start.y > l1.end.y):
					if (l1.slope > 0):
						l1startnewx = mint
						l1startnewy = l1startnewx * l1.slope + l1.intercept
					else:
						l1startnewx = -mint
						l1startnewy = l1startnewx * l1.slope + l1.intercept
		
				
				x2 = Polygon(Point(l2.start.x, l2.start.y), Point(l1.end.x, l1.end.y), Point(l2.end.x, l2.end.y))
				x1 = Polygon(Point(l2.start.x, l2.start.y), Point(l1startnewx, l1startnewy), Point(l2endnewx, l2endnewy))

				for y in range(0, len(points)):
				 	if (x1.encloses_point(points[y]) and points[y]!=Point(l1.start.x, l1.start.y) and points[y]!=Point(l2.end.x, l2.end.y)) :
				 		if ( ( ( ptwl[y].y + 2 > (ptwl[y].x * l1.slope + l1.intercept) ) and ( ptwl[y].y - 2 < (ptwl[y].x * l1.slope + l1.intercept) ) ) or ( ( ptwl[y].y + 2 > (ptwl[y].x * l2.slope + l2.intercept) ) and ( ptwl[y].y - 2 < (ptwl[y].x * l2.slope + l2.intercept) ) )):
				 			continue
				 		for ang1 in [ x for x in angles if ((x.lLine==l1 and x.rLine==l2) or (x.lLine==l2 and x.rLine == l1) ) ]:
				 			angles.remove(ang1)

				
			elif (pointCheck(l2.end, l1.start)):
				if (l2.start.y < l2.end.y):
					if (l2.slope > 0):
					
						l2startnewx = -mint
						l2startnewy = l2startnewx * l2.slope + l2.intercept
					else:
						l2startnewx = mint
						l2startnewy = l2startnewx * l2.slope + l2.intercept

				elif (l2.start.y > l2.end.y):
					if (l2.slope > 0):
					
						l2startnewx = mint
						l2startnewy = l2startnewx * l2.slope + l2.intercept
					else:
						l2startnewx = -mint
						l2startnewy = l2startnewx * l2.slope + l2.intercept

				if (l1.start.y < l1.end.y):
					if (l1.slope > 0):
						l1endnewx = mint
						l1endnewy = l1endnewx * l1.slope + l1.intercept
					else:
						l1endnewx = -mint
						l1endnewy = l1endnewx * l1.slope + l1.intercept
				elif (l1.start.y > l1.end.y):
					if (l1.slope > 0):
						l1endnewx = -mint
						l1endnewy = l1endnewx * l1.slope + l1.intercept
					else:
						l1endnewx = mint
						l1endnewy = l1endnewx * l1.slope + l1.intercept
				
				x1 = Polygon(Point(l2.end.x, l2.end.y), Point(l2startnewx, l2startnewy), Point(l1endnewx, l1endnewy))
				for y in range(0, len(points)):
				 	if (x1.encloses_point(points[y]) and points[y]!=Point(l1.end.x, l1.end.y) and points[y]!=Point(l2.start.x, l2.start.y)) :
				 		
				 		if ( ( ( ptwl[y].y + 2 > (ptwl[y].x * l1.slope + l1.intercept) ) and ( ptwl[y].y - 2 < (ptwl[y].x * l1.slope + l1.intercept) ) ) or ( ( ptwl[y].y + 2 > (ptwl[y].x * l2.slope + l2.intercept) ) and ( ptwl[y].y - 2 < (ptwl[y].x * l2.slope + l2.intercept) ) )):
				 			continue
				 		for ang1 in [ x for x in angles if ((x.lLine==l1 and x.rLine==l2) or (x.lLine==l2 and x.rLine == l1) ) ]:
				 			angles.remove(ang1)
			elif (pointCheck(l2.end, l1.end)):
				if (l2.start.y < l2.end.y):
					if (l2.slope > 0):
					
						l2startnewx = -mint
						l2startnewy = l2startnewx * l2.slope + l2.intercept
					else:
						l2startnewx = mint
						l2startnewy = l2startnewx * l2.slope + l2.intercept

				elif (l2.start.y > l2.end.y):
					if (l2.slope > 0):
					
						l2startnewx = mint
						l2startnewy = l2startnewx * l2.slope + l2.intercept
					else:
						l2startnewx = -mint
						l2startnewy = l2startnewx * l2.slope + l2.intercept

				if (l1.start.y < l1.end.y):
					if (l1.slope > 0):
						l1startnewx = -mint
						l1startnewy = l1startnewx * l1.slope + l1.intercept
					else:
						l1startnewx = mint
						l1startnewy = l1startnewx * l1.slope + l1.intercept
				elif (l1.start.y > l1.end.y):
					if (l1.slope > 0):
						l1startnewx = mint
						l1startnewy = l1startnewx * l1.slope + l1.intercept
					else:
						l1startnewx = -mint
						l1startnewy = l1startnewx * l1.slope + l1.intercept
				x1 = Polygon(Point(l2.end.x, l2.end.y), Point(l2startnewx, l2startnewy), Point(l1startnewx, l1startnewy))
				for y in range(0, len(points)):
				 	if (x1.encloses_point(points[y]) and points[y]!=Point(l1.start.x, l1.start.y) and points[y]!=Point(l2.start.x, l2.start.y)) :
				 		if ( ( ( ptwl[y].y + 2 > (ptwl[y].x * l1.slope + l1.intercept) ) and ( ptwl[y].y - 2 < (ptwl[y].x * l1.slope + l1.intercept) ) ) or ( ( ptwl[y].y + 2 > (ptwl[y].x * l2.slope + l2.intercept) ) and ( ptwl[y].y - 2 < (ptwl[y].x * l2.slope + l2.intercept) ) )):
				 			continue
				 		for ang1 in [ x for x in angles if ((x.lLine==l1 and x.rLine==l2) or (x.lLine==l2 and x.rLine == l1) ) ]:
				 			angles.remove(ang1)

		

with open("datafile.json") as file:
	allData = json.load(file)
	dataPoints = allData['points']
	dataLines = allData['lines']
	dataAngles = allData['angles']

	points = []
	lines = []
	angles = []
	ptwl=[]

	for p in dataPoints:
		points.append(Point( p['x'], p['y']))

	for p in dataPoints:
		ptwl.append(Pointo(p['labe'], p['x'], p['y']))

	for l in dataLines:
		p = [x for x in ptwl if x.label == l['start']['labe']][0]
		q = [x for x in ptwl if x.label == l['end']['labe']][0]
		lines.append(Lineo(p.label + q.label, p, q))
	for a in dataAngles:
		l = [x for x in lines if x.label == a['leftline']['start']['labe']+a['leftline']['end']['labe']][0]
		r = [x for x in lines if x.label == a['rightline']['start']['labe']+a['rightline']['end']['labe']][0]
		id = l.label + r.label
		if (id[0] == id[2]):
			id = l.label[::-1]+r.label

		if (id[0] == id[3]):
			id = l.label[::-1]+r.label[::-1]

		if (id[1] == id[3]):
			id = l.label + r.label[::-1]

		id = id[0:2]+id[3]
		angles.append(Angleo(id, int(a['value']), l, r))


	
triangleFinder2(lines)
