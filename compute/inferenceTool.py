from functools import reduce
import json
import math
from inferenceUtil import *


def pointCheck(a, b):
	return a.x == b.x and a.y == b.y


def checkTriangle(l1, l2, l3):
	points = [(l1.start.x, l1.start.y), (l1.end.x, l1.end.y), (l2.start.x, l2.start.y), (l2.end.x, l2.end.y), (l3.start.x, l3.start.y), (l3.end.x, l3.end.y),]
	pset = set(points)
	if(len(pset) == 3):
		if(l1.slope != l2. slope and l1.slope != l3. slope and l2.slope != l3. slope):
			# print('Triangle!!')
			return [l1, l2, l3]
		else:
			#print('Nope')
			return []
	else:
		#print('Nope')
		return []

def getAngles(tri):
	a = []
	for ang in angles:
		if(ang.lLine in tri and ang.rLine in tri):
			a.append(ang)
	return a

def triangleFinder(txLines):
	tLines=[]
	tLines.extend(txLines)
	for l1 in tLines:
		tLines.remove(l1)
		for l2 in [x for x in tLines if pointCheck(x.start, l1.start) or pointCheck(x.end, l1.start)]:
			for l3 in tLines:
				connect = checkTriangle(l1, l2, l3)
				if not connect:
					pass
				else:
					triangles.append(connect)
					# for line in connect:
					# 	print(str(line), end=" -- ")
					# print()

def matchToTheorem():
	for tri in triangles:
		anglesInThis = getAngles(tri)
		for a in anglesInThis:
			if(not a.known):
				a.setValue(180 - (reduce(lambda x, y:x+y, [x.value for x in anglesInThis if not x == a])))
				# print(a.id, a.value, ":", "Angle sum property, ", [str(x) for x in anglesInThis if not x == a])
				solution.append([a.id, a.value, ":", "Angle sum property, ", [str(x) for x in anglesInThis if not x == a]])

def checkStraight(l1, l2):
	# print(l1.slope, ", ", l2.slope)
	if(l1.slope == 0 and math.fabs(l2.slope) <= 0.05):
		if(l1.start == l2.end or l1.start == l2.start):
			return l1.start
		elif(l1.end == l2.start or l1.end == l2.end):
		 	return l1.end
	elif(l2.slope == 0 and math.fabs(l1.slope) <= 0.05):
		if(l1.start == l2.end or l1.start == l2.start):
			return l1.start
		elif(l1.end == l2.start or l1.end == l2.end):
		 	return l1.end
	elif(math.fabs(l1.slope) >= math.fabs(0.95*l2.slope) and math.fabs(l1.slope) <= math.fabs(1.05*l2.slope)):
		if(l1.start == l2.end or l1.start == l2.start):
			return l1.start
		elif(l1.end == l2.start or l1.end == l2.end):
		 	return l1.end
	else:
		return False

def checkSupplementary(l1, l2, l):
	
	strtLine = checkStraight(l1, l2)
	if(strtLine is False):
		# print("Cannot able to.")
		pass
	else:
		properLinesUp = [l1, l2]
		properLinesDown = [l1, l2]
		for line in l:
			# print(type(line))
			if(line.start == strtLine):
				if(line.end.y > (l1.slope*line.end.x + (strtLine.y - l1.slope*strtLine.x))):
					properLinesDown.append(line)
				elif(line.end.y < (l1.slope*line.end.x + (strtLine.y - l1.slope*strtLine.x))):
					properLinesUp.append(line)
			elif(line.end == strtLine):
				if(line.start.y > (l1.slope*line.start.x + (strtLine.y - l1.slope*strtLine.x))):
					properLinesDown.append(line)
				elif(line.start.y < (l1.slope*line.start.x + (strtLine.y - l1.slope*strtLine.x))):
					properLinesUp.append(line)

		pL = []
		for lx in properLinesUp:
			if lx not in pL:
				pL.append(lx)
		properLinesUp = pL

		pL = []
		for lx in properLinesDown:
			if lx not in pL:
				pL.append(lx)
		properLinesDown = pL

		properAnglesUp = []
		properAnglesDown = []
		for a in angles:
			if(a.lLine in properLinesUp and a.rLine in properLinesUp):
				properAnglesUp.append(a)
			elif(a.lLine in properLinesDown and a.rLine in properLinesDown):
				properAnglesDown.append(a)

		# for lx in properAnglesUp:
		# 	print(lx, lx.known)
		# print("-------")
		# for lx in properAnglesDown:
		# 	print(lx, lx.known)
		if(len(properAnglesUp)>1):
			for ang in properAnglesUp:
				if(not ang.known):
					ang.setValue(180 - (reduce(lambda x, y : x+y, [x.value for x in properAnglesUp if not x == ang])))
					# print(ang.id, ang.value, ":", "UpSupplementary angles, ", [str(x) for x in properAnglesUp if not x == ang])
					solution.append([ang.id, ang.value, ":", "Supplementary angles, ", [str(x) for x in properAnglesUp if not x == ang]])
					# properAnglesUp.remove(ang)
					# if(ang in properAnglesDown):
					# 	properAnglesDown.remove(ang)
		if(len(properAnglesDown)>1):
			for ang in properAnglesDown:
				if(not ang.known):
					ang.setValue(180 - (reduce(lambda x, y : x+y, [x.value for x in properAnglesDown if not x == ang])))
					# print(ang.id, ang.value, ":", "DownSupplementary angles, ", [str(x) for x in properAnglesDown if not x == ang])
					solution.append([ang.id, ang.value, ":", "Supplementary angles, ", [str(x) for x in properAnglesDown if not x == ang]])
					# properAnglesDown.remove(ang)
					# if(ang in properAnglesUp):
					# 	properAnglesUp.remove(ang)

def runCheckSup(lines):
	# print("Supplementary check called")
	for l1 in lines:
		for l2 in lines:
			if(l1 is not l2):
				checkSupplementary(l1, l2, [x for x in lines if x is not l1 and x is not l2])

def findSomeAngles(fLines):
	# print("Around a point called")
	for p in points:
		# print(p)
		linesOnThis = [l for l in fLines if (l.start == p or l.end == p)]
		# print(len(linesOnThis))
		# for lx in linesOnThis:
		# 	print(lx)
		# print()
		anglesToCheck = [a for a in angles if a.rLine in linesOnThis and a.lLine in linesOnThis]
		if(len(anglesToCheck) > 1):
			# print(p, "----------------")
			# for a in anglesToCheck:
			# 	print(a)
			# print("----------------")
			for ang in anglesToCheck:
				if(not ang.known):
					if(len([str(x) for x in anglesToCheck if not x == ang]) > 0):
						ang.setValue(360 - reduce(lambda x, y: x+y, [x.value for x in anglesToCheck if not x == ang]))
						if(ang.value > 180):
							ang.setValue(ang.value - 180)
						# print(ang.id, ang.value, ":", "Angles around a point, ", [str(x) for x in anglesToCheck if not x == ang])
						solution.append([ang.id, ang.value, ":", "Angles around a point, ", [str(x) for x in anglesToCheck if not x == ang]])
					else:
						# print("Naat.")
						pass

with open("datafile.json") as file:
	allData = json.load(file)
	dataPoints = allData['points']
	dataLines = allData['lines']
	dataAngles = allData['angles']

	points = []
	lines = []
	angles = []
	triangles = []

	for p in dataPoints:
		points.append(Pointo(p['labe'], p['x'], p['y']))

	for l in dataLines:
		p = [x for x in points if x.label == l['start']['labe']][0]
		q = [x for x in points if x.label == l['end']['labe']][0]
		lines.append(Lineo(p.label+q.label, p, q))
	
	for a in dataAngles:
		l = [x for x in lines if x.label == a['leftline']['start']['labe']+a['leftline']['end']['labe']][0]
		r = [x for x in lines if x.label == a['rightline']['start']['labe']+a['rightline']['end']['labe']][0]
		id = l.label+r.label
		if(id[0] == id[2]):
			id = l.label[::-1]+r.label

		if(id[0] == id[3]):
			id = l.label[::-1]+r.label[::-1]

		if(id[1] == id[3]):
			id = l.label+r.label[::-1]

		id = id[0:2]+id[3]
		angles.append(Angleo(id, int(a['value']), l, r))

solution = []
triangleFinder2(lines)
triangleFinder(lines)
matchToTheorem()
execflag=0
runCheckSup(lines)
findSomeAngles(lines)

finalSolution = []
for s in solution:
	if((s not in finalSolution) and (s[1])>0):
		finalSolution.append(s)
print("Final solution")
for fs in finalSolution:
	print(fs)