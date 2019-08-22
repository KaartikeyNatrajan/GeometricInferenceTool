var datatosend = [];
var lab;
var flag = 0;
var ind = 1;
var pind = 1;
var lines = [];
var lines2del = [];
var lines2add = [];
var pointsVfound = [];
var DrawArea = document.querySelector('#DrawArea');
var canvas = document.getElementById('Maincanvas'),
ctx = canvas.getContext('2d');
line = {};
points = [];
uniqpoints = [];
uniqpoints.push(
{
	x: -1,
	y: -1,
	labe: '-'
}
);
temparr = {};
temparrs = {};
lineobj =
{
	start:
	{
		x: 1,
		y: 1,
		labe: ''
	},
	end:
	{
		x: 2,
		y: 1,
		labe: ''
	},
	slopes: function ()
	{
		return (this.end.y - this.end.y) / (this.end.x - this.start.x);
	}
};

angle = {};
angles = [];
drag = false;
var tmp_canvas = document.createElement('canvas');
var tmp_ctx = tmp_canvas.getContext('2d');
tmp_canvas.id = 'tmp_canvas';
tmp_canvas.width = canvas.width;
tmp_canvas.height = canvas.height;

var tmp_canvasangle = document.createElement('canvas');
var tmp_ctxangle = tmp_canvasangle.getContext('2d');
tmp_canvasangle.id = 'tmp_canvasangle';
tmp_canvasangle.width = canvas.width;
tmp_canvasangle.height = canvas.height;

tmp_ctx.lineWidth = 3;
tmp_ctx.lineJoin = 'round';
tmp_ctx.lineCap = 'round';
tmp_ctx.strokeStyle = 'white';
tmp_ctx.fillStyle = 'white';

ctx.lineWidth = 5;
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.strokeStyle = 'white';
ctx.fillStyle = 'white';

DrawArea.appendChild(tmp_canvas);
drawgrid();
temparr.toString = function ()
{
	return this.x + ", " + this.y
};
init();
function addlab()
{
	if (!labelcheck(pind))
	{
		alert("Not enough points to add labels for");
	}
	else
	{
		DrawArea.appendChild(tmp_canvasangle);
		tmp_canvasangle.style.top = tmp_canvas.style.top;
		tmp_canvasangle.addEventListener('dblclick', Mousedclick, event.preventDefault());
		tmp_canvas.removeEventListener('mousedown', mouseDown, false);
		tmp_canvas.removeEventListener('mouseup', mouseUp, false);
		tmp_canvas.removeEventListener('mousemove', mouseMove, false);
		tmp_ctxangle.lineWidth = 1;
		tmp_ctxangle.lineJoin = 'round';
		tmp_ctxangle.lineCap = 'round';
		tmp_ctxangle.strokeStyle = 'white';
		tmp_ctxangle.fillStyle = 'rgba(255,0,0,0.5)';
		tmp_ctxangle.beginPath();
		tmp_ctxangle.arc(uniqpoints[pind].x, uniqpoints[pind].y, 10, 0, 2 * Math.PI);

		tmp_ctxangle.stroke();
		tmp_ctxangle.fill();
		tmp_ctxangle.closePath();
		pind++;
		var divlab = document.createElement("div");
		divlab.setAttribute("class", "col-md-6 col-md-offset-5");
		var i = document.createElement("input");
		i.type = "text";
		i.name = "user_name";
		i.id = "label_id";
		i.setAttribute("required", "");
		var s = document.createElement("button");
		s.id = "b1";
		s.textContent = 'submit';
		s.type = "submit";
		s.value = "Submit";
		s.setAttribute("class", "btn btn-primary btn-sm")
		i.required = true;
		i.autofocus = true;
		i.setAttribute("required", "");
		i.focus();
		s.onclick = function ()
		{
			lab = i.value;
			ctx.font = "20px Calibri";
			if (uniqpoints[ind].y < 250)
			{
				ctx.fillText(lab, uniqpoints[ind].x, uniqpoints[ind].y - 15);
			}
			else
			{
				ctx.fillText(lab, uniqpoints[ind].x, uniqpoints[ind].y + 20);
			}
			uniqpoints[ind].labe = lab;
			ind++;
			divlab.removeChild(s);
			divlab.removeChild(i);
			document.getElementById("AngleArea").removeChild(divlab);
			printuniq();
			tmp_canvas.addEventListener('mousedown', mouseDown, false);
			tmp_canvas.addEventListener('mouseup', mouseUp, false);
			tmp_canvas.addEventListener('mousemove', mouseMove, false);
			tmp_ctxangle.clearRect(uniqpoints[ind - 1].x - 20, uniqpoints[ind - 1].y - 20, uniqpoints[ind - 1].x + 20, uniqpoints[ind - 1].y + 20);
			if (ind == pind)
			{
				DrawArea.removeChild(tmp_canvasangle);
			}

		};

		divlab.appendChild(i);
		divlab.appendChild(s);
		document.getElementById('AngleArea').appendChild(divlab);
	}

}

function drawgrid()
{
	for (var x = 0.5; x < 801; x += 20)
	{
		ctx.moveTo(x, 0);
		ctx.lineTo(x, 500);
	}

	for (var y = 0.5; y < 501; y += 20)
	{
		ctx.moveTo(0, y);
		ctx.lineTo(800, y);
	}

	ctx.lineWidth = 1;
	ctx.strokeStyle = "#41545e";
	ctx.stroke();
}

function draw()
{
	tmp_ctx.clearRect(0, 0, 800, 500);
	tmp_ctx.beginPath();
	tmp_ctx.moveTo(line.startX, line.startY);
	tmp_ctx.lineTo(temparr.x, temparr.y);
	tmp_ctx.stroke();
	tmp_ctx.closePath();
}

function drawAngle()
{

	var j = document.createElement("input");
	j.type = "number";
	j.name = "user_name";
	j.id = "angle_id";

	var s1 = document.createElement("button");
	s1.id = "b2";
	s1.textContent = 'submit';
	s1.type = "submit";
	s1.value = "Submit";

	var Lastpoint = points.slice(-1)[0];
	var secondlast = points[points.length - 2];
	var x1 = Lastpoint.x;
	var y1 = Lastpoint.y;
	var x2 = secondlast.x;
	var y2 = secondlast.y;
	var m1 = (y1 - y2) / (x1 - x2);
	s1.onclick = function ()
	{
		var angle = j.value;
		angle = parseInt(angle);
		var M = Math.tan(angle);
		var m2 = (M - m1) / (1 - M * m1);
		var theta = Math.atan(m2);

		tmp_ctx.moveTo(x1, y1);
		tmp_ctx.lineTo(x1 - 300 * (Math.cos(theta)), y1 - 300 * (Math.sin(theta)));
		tmp_ctx.stroke();
		document.getElementsByTagName('body')[0].removeChild(s1);
		document.getElementsByTagName('body')[0].removeChild(j);
		printuniq();

	};
	document.getElementsByTagName('body')[0].appendChild(j);
	document.getElementsByTagName('body')[0].appendChild(s1);
}

function getCursorPosition(canvas, event)
{
	alert('Click on the point where you want to draw the angle');
	var rect = canvas.getBoundingClientRect();
	var x = event.clientX - rect.left;
	var y = event.clientY - rect.top;
}

function mouseDown(e)
{
	if (!drag)
	{
		line.startX = e.pageX - this.offsetLeft;
		line.startY = e.pageY - this.offsetTop;
		temparr =
		{
			x: line.startX,
			y: line.startY,
			labe: '-'
		};
		temparr = line_stick_helper(temparr);
		temparr = checkpoint(temparr);
		line.startX = temparr.x;
		line.startY = temparr.y;

		flag = 0;
		for (var i in uniqpoints)
		{
			if (uniqpoints[i].x == temparr.x && uniqpoints[i].y == temparr.y)
			{
				flag = 1;
			}
		}
		if (flag == 0)
		{
			uniqpoints.push(temparr);
		}
		points.push(temparr);
		lineobj =
		{
			start: temparr,
			end: temparr
		};

	}

	drag = true;
}

function labelcheck(pind)
{
	if ((pind - 1) >= uniqpoints.length - 1)
	{
		return false;

	}
	else
	{
		return true;
	}
}
function mouseUp()
{
	drag = false;
	ctx.drawImage(tmp_canvas, 0, 0);
	temparr =
	{
		x: line.w,
		y: line.h,
		labe: '-'
	};
	temparr = line_stick_helper(temparr);
	temparr = checkpoint(temparr);

	points.push(temparr);
	lineobj.end = temparr;
	lines.push(lineobj);

	flag = 0;
	for (var i in uniqpoints)
	{
		if (uniqpoints[i].x == temparr.x && uniqpoints[i].y == temparr.y)
		{
			flag = 1;
		}
	}
	if (flag == 0)
	{
		uniqpoints.push(temparr);

	}
}

function mouseMove(e)
{

	if (drag)
	{

		line.w = (e.pageX - this.offsetLeft);
		line.h = (e.pageY - this.offsetTop);

		temparr =
		{
			x: line.w,
			y: line.h,
			labe: '-'
		};

		temparr = line_stick_helper(temparr);

		temparr = checkpoint(temparr);
		draw();

	}
}

function init()
{
	tmp_canvas.addEventListener('mousedown', mouseDown, false);
	tmp_canvas.addEventListener('mouseup', mouseUp, false);
	tmp_canvas.addEventListener('mousemove', mouseMove, false);
}

function Mousedclick(e)
{}

function addRect(x, y, w, h, fill)
{
	var rect = {};
	rect.x = x;
	rect.y = y;
	rect.w = w
		rect.h = h;
	rect.fill = fill;
}

function checkpoint(curr)
{
	var r = 20;
	var newpoint =
	{
		x: curr.x,
		y: curr.y,
		labe: curr.labe
	};
	for (var pt in points)
	{

		var Dot = points[pt];
		if (clickedInside(curr, Dot, r))
		{

			newpoint.x = Dot.x;
			newpoint.y = Dot.y;
			newpoint.labe = Dot.labe;
			return newpoint;
		}
	}

	return newpoint;

}

var clickedInside = function (coords, point, r)
{
	var r2 = r * r;
	var value = (((coords.x - point.x) * (coords.x - point.x)) + ((coords.y - point.y) * (coords.y - point.y)));
	return value <= r2;
};

function printuniq()
{
	// for ( var count in uniqpoints)
	// {
	// }

}
function angelSubmit()
{

	var subtrue = false;
	var f = document.createElement("form");
	f.setAttribute("id", "angle-form")
	for (var g = angles.length - 1; g >= 0; g--)
	{
		if (angles[g].value == 0)
			continue;
		else
			subtrue = true;
		var labelforang = document.createElement("label");
		labelforang.setAttribute("class", "col-md-12 control-label");
		labelforang.innerHTML = "<br>" + (g + 1) + ". Angle between " + angles[g].leftline.start.labe + "" + angles[g].leftline.end.labe + " and " + angles[g].rightline.start.labe + "" + angles[g].rightline.end.labe + "<br>";
		var divs = document.createElement("div");
		divs.setAttribute("class", "col-md-9");
		var i = document.createElement("input"); //input element, text
		i.setAttribute('class', 'form-control input-lg');
		i.setAttribute('width', '50%');
		i.setAttribute('type', "number");
		i.setAttribute('name', "Angle1");
		i.setAttribute('value', angles[g].value);
		i.setAttribute('id', g)
		f.appendChild(labelforang);
		divs.appendChild(i);

		var divsb = document.createElement("div");
		divsb.setAttribute("class", "col-md-3");

		var uk = document.createElement("button"); //input element, Submit button
		uk.setAttribute('class', "btn btn-success btn-lg")
		uk.setAttribute('type', "button");
		//uk.setAttribute('value',"Set Unknown");
		uk.innerHTML = "Set Unknown";
		uk.setAttribute("id", i.id * 5);
		divsb.appendChild(uk);
		f.appendChild(divs);
		f.appendChild(divsb);
		uk.onclick = function ()
		{

			var angval = document.getElementById(this.id / 5);
			angval.value = -1;

		}

	};
	if (subtrue)
	{
		var divsu = document.createElement("div");
		divsu.setAttribute("class", "col-md-9");
		var s = document.createElement("input"); //input element, Submit button
		s.setAttribute('class', "btn btn-primary btn-lg")
		s.setAttribute('type', "button");
		s.setAttribute('value', "Submit");
		divsu.appendChild(s);
		f.appendChild(divsu);
		s.onclick = function ()
		{

			var eles;

			for (var g = angles.length - 1; g >= 0; g--)
			{
				if (angles[g].value == 0)
					continue;
				eles = document.getElementById(g);
				angles[g].value = eles.value;

			}
			for (var g = angles.length - 1; g >= 0; g--)
			{}

			document.getElementById("AngleArea").removeChild(f);
		}

		document.getElementById("AngleArea").appendChild(f);
	}

}

function sendcanvasdata()
{
	// {	for (var i in points){
	// }
	var linestr = "";
	var pointstr = "";
	var anglestr = "";
	var senddata = "";
	for (var i = 0; i < points.length; i++)
	{
		for (var j = i + 1; j < points.length; j++)
		{
			if ((points[j].x == points[i].x) && (points[j].y == points[i].y))
			{
				points[j].labe = points[i].labe;
			}
		}
	}
	for (var i = 0; i < points.length; i++)
	{
		for (var j = i + 1; j < points.length; j++)
		{
			if ((points[j].x == points[i].x) && (points[j].y == points[i].y))
			{
				points[j].labe = points[i].labe;
			}
		}
	}
	uniqlines = [];
	for (var i = 0; i < lines.length; i++)
	{
		var tempflag = 0;
		for (var j = i + 1; j < lines.length - 1; j++)
		{
			if ((lines[j].start.x == lines[i].start.x) && (lines[j].start.y == lines[i].start.y) && (lines[j].end.x == lines[i].end.x) && (lines[j].end.y == lines[i].end.y))
				tempflag = 1;
			else
			{}
		};
		if (tempflag == 0)
		{
			uniqlines.push(lines[i]);
		}

	};

	var data = new FormData();
	datatosend = [];
	strdata = "";
	data.append("data", "the_text_you_want_to_save");
	var xhr = new XMLHttpRequest();
	strdata += 'points';
	for (var i in uniqpoints)
	{
		if (i != 0)
		{

			datatosend.push(uniqpoints[i].labe);
			datatosend.push(uniqpoints[i].x);

			datatosend.push(uniqpoints[i].y);
			strdata += uniqpoints[i].labe + " " + uniqpoints[i].x + " " + uniqpoints[i].y + "\n";
		}
	}

	if (uniqpoints[0].x == -1)
		uniqpoints.splice(0, 1);
	pointstr = JSON.stringify(uniqpoints);
	senddata = "{ \"points\"  :";
	senddata += pointstr;
	senddata += ",";

	strdata = "";
	for (var i = 0; i < uniqlines.length; i++)
	{
		strdata += uniqlines[i].start.labe + "" + uniqlines[i].end.labe + "\n";
	}

	senddata += "\"lines\"  :";

	linestr = JSON.stringify(uniqlines);
	senddata += linestr;
	senddata += ",";

	strdata = "";
	for (var i = 0; i < angles.length; i++)
	{
		if (angles[i].value != 0)
		{
			strdata += angles[i].value + "  " + angles[i].leftline.start.labe + "" + angles[i].leftline.end.labe + "  " + angles[i].rightline.start.labe + "" + angles[i].rightline.end.labe + "\n";
		}
	}
	senddata += "\"angles\"  :";

	anglestr = JSON.stringify(angles);
	senddata += anglestr;
	senddata += "}";
	data.append('data', senddata);
	var xhr = new XMLHttpRequest();
	xhr.open('post', 'savedata.php', true);

	xhr.send(data);

	xhr.onreadystatechange = function ()
	{
		if (xhr.readyState == 4 && xhr.status == 200)
		{
			var btn = document.getElementById("subbut");
			btn.disabled = true;
			var ta = document.createElement("textarea");
			var bt = document.createElement("button");
			ta.setAttribute("class", "form-control");
			ta.setAttribute("id", "txtarea");

			ta.setAttribute("rows", 8);
			ta.setAttribute("cols", "100");
			ta.setAttribute("background", "white");
			ta.value = "Output:\n";
			ta.disabled = true;
			bt.setAttribute("class", "btn btn-primary");
			bt.textContent = "OK";
			var ft = document.getElementById("DrawArea");
			ft.appendChild(ta);
			ft.appendChild(bt);
			ta.value += xhr.responseText;

			bt.onclick = function ()
			{
				ft.removeChild(bt);
				ft.removeChild(ta);
				btn.disabled = false;

			}
		}
	}
}

function processdata()
{
	process2();
	var btn = document.getElementById("subbut");
	btn.disabled = false;
}

function process2()
{

	modifylinesarray();
	angles = [];
	for (var i = 0; i < points.length; i++)
	{
		for (var j = i + 1; j < points.length; j++)
		{
			if ((points[j].x == points[i].x) && (points[j].y == points[i].y))
			{
				points[j].labe = points[i].labe;
			}
		}
	}

	for (var i = 0; i < uniqlines.length; i++)
	{
		for (var j = i + 1; j < uniqlines.length; j++)
		{
			if ((uniqlines[j].start.labe == uniqlines[i].start.labe) || (uniqlines[j].start.labe == uniqlines[i].end.labe) || (uniqlines[j].end.labe == uniqlines[i].start.labe) || (uniqlines[j].end.labe == uniqlines[i].end.labe))
			{
				var m1 = slope(uniqlines[i]);
				var m2 = slope(uniqlines[j]);
				var ang = (Math.atan((m1 - m2) / (1 + m1 * m2)));
				ang = Math.abs(Math.round(ang * 180 / Math.PI));
				if (ang > 9)
				{
					angle =
					{
						value: ang,
						leftline: uniqlines[j],
						rightline: uniqlines[i]
					};
					angles.push(angle);
				}
			}
		}
	}

	//angle_modify();
	//angelSubmit();
}

function angle_modify()
{
	var marked = [];
	var marcount = 0;
	for (var i = 0; i < angles.length; i++)
	{
		var right = angles[i].rightline;
		var rstart = right.start.labe;
		var rend = right.end.labe;
		for (var k = i + 1; k < angles.length; k++)
		{
			if ((angles[k].rightline.start.labe == rstart) && (angles[k].rightline.end.labe == rend))
			{
				marked.push(k);
				marcount++;
			}
		}
		i = i + marcount;
	};
	for (var i = marked.length - 1; i >= 0; i--)
	{

		if (i > -1)
		{
			angles.splice(i, 1);
		}

	};
}

function slope(l)
{
	return ((l.end.y - l.start.y) / (l.end.x - l.start.x));
}

function intercept(l, m)
{
	return ((l.start.y) - (m * l.start.x));
}

function intersection(l1, l2)
{
	var m1 = slope(l1);
	var c1 = intercept(l1, m1);
	var m2 = slope(l2);
	var c2 = intercept(l2, m2);

	var valx = (c2 - c1) / (m1 - m2);
	var valy = m1 * valx + c1;
	if (!((valx > 800) || (valy > 500) || (valx < 0) || (valy < 0)))
	{
		x1 = l1.start.x;
		y1 = l1.start.y;
		x2 = l1.end.x;
		y2 = l1.end.y;
		var AB = Math.round(Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1)));
		var AP = Math.round(Math.sqrt((valx - x1) * (valx - x1) + (valy - y1) * (valy - y1)));
		var PB = Math.round(Math.sqrt((x2 - valx) * (x2 - valx) + (y2 - valy) * (y2 - valy)));

		x1 = l2.start.x;
		y1 = l2.start.y;
		x2 = l2.end.x;
		y2 = l2.end.y;

		var CD = Math.round(Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1)));
		var CP = Math.round(Math.sqrt((valx - x1) * (valx - x1) + (valy - y1) * (valy - y1)));
		var DP = Math.round(Math.sqrt((x2 - valx) * (x2 - valx) + (y2 - valy) * (y2 - valy)));
		if (((AB + 10) > (AP + PB)) && ((AB - 10) < (AP + PB)) && ((CD + 10) > (CP + DP)) && ((CD - 10) < (CP + DP)))
			return (
			{
				x: Math.round(valx),
				y: Math.round(valy)
			}
			);
		else
			return false;
	}
	else
		return false;
}

function linesplitter(l, K, poi)
{
	var waitflag = 0;

	var indexofi = 0;

	poi.x = Math.round(poi.x);
	poi.y = Math.round(poi.y);

	var splitflag = conditioncheck(l, K, poi);
	if (splitflag == false)
	{
		return false;
	}
	else if (splitflag == 3)
	{
		split2(K, l.end.labe, poi);
		return;
	}
	else if (splitflag == 2)
	{
		split2(K, l.start.labe, poi);
		return;
	}
	else if (splitflag == 4)
	{
		split2(l, K.start.labe, poi);
		return;
	}
	else if (splitflag == 5)
	{
		split2(l, K.end.labe, poi);
		return;
	}
	else
	{

		var flagVfound = false;

		for (var i = 0; i < pointsVfound.length; i++)
		{
			if (poi.x + 5 > pointsVfound[i].x && poi.x - 5 < pointsVfound[i].x && poi.y + 5 > pointsVfound[i].y && poi.y - 5 < pointsVfound[i].y)
			{
				flagVfound = true;
				indexofi = i;
				break;
			}
		}

		if (flagVfound)
		{
			var nline1 =
			{
				start:
				{
					x: l.start.x,
					y: l.start.y,
					labe: l.start.labe
				},
				end:
				{
					x: poi.x,
					y: poi.y,
					labe: pointsVfound[indexofi].labe
				}
			};
			var nline2 =
			{
				start:
				{
					x: poi.x,
					y: poi.y,
					labe: pointsVfound[indexofi].labe
				},
				end:
				{
					x: l.end.x,
					y: l.end.y,
					labe: l.end.labe
				}
			};
			lines2add = [];
			lines2del = [];
			lines2add.push(nline1);
			lines2add.push(nline2);
			lines2del.push(l);
			return false;
		}
		else
		{
			DrawArea.appendChild(tmp_canvasangle);
			tmp_canvasangle.style.top = tmp_canvas.style.top;
			tmp_canvasangle.addEventListener('dblclick', Mousedclick, event.preventDefault());
			tmp_canvas.removeEventListener('mousedown', mouseDown, false);
			tmp_canvas.removeEventListener('mouseup', mouseUp, false);
			tmp_canvas.removeEventListener('mousemove', mouseMove, false);
			tmp_ctxangle.lineWidth = 1;
			tmp_ctxangle.lineJoin = 'round';
			tmp_ctxangle.lineCap = 'round';
			tmp_ctxangle.strokeStyle = 'white';
			tmp_ctxangle.fillStyle = 'rgba(255,0,0,0.5)';
			tmp_ctxangle.beginPath();
			tmp_ctxangle.arc(poi.x, poi.y, 10, 0, 2 * Math.PI);

			tmp_ctxangle.stroke();
			tmp_ctxangle.fill();
			tmp_ctxangle.closePath();
			var divint = document.createElement("div");
			divint.setAttribute("class", "col-md-12 col-md-offset-4");
			var lbl = document.createElement('label');
			var i = document.createElement("input");
			lbl.innerHTML = "Point of intersection found. please enter label";
			i.type = "text";
			i.name = "user_name";
			i.id = "label_id";

			i.setAttribute("required", "true");

			divint.appendChild(lbl);

			var s = document.createElement("button");
			s.id = "b1";
			s.textContent = 'submit';
			s.type = "submit";
			s.value = "Submit";
			s.setAttribute("class", "btn btn-primary")
			i.required = true;

			i.focus();

			divint.appendChild(lbl);
			divint.appendChild(i);
			divint.appendChild(s);
			document.getElementById("AngleArea").appendChild(divint);

			s.onclick = function ()
			{
				lab = i.value;

				var nline1 =
				{
					start:
					{
						x: l.start.x,
						y: l.start.y,
						labe: l.start.labe
					},
					end:
					{
						x: poi.x,
						y: poi.y,
						labe: lab
					}
				};
				var nline2 =
				{
					start:
					{
						x: poi.x,
						y: poi.y,
						labe: lab
					},
					end:
					{
						x: l.end.x,
						y: l.end.y,
						labe: l.end.labe
					}
				};
				pointsVfound.push(
				{
					x: poi.x,
					y: poi.y,
					labe: lab
				}
				);
				points.push(
				{
					x: poi.x,
					y: poi.y,
					labe: lab
				}
				);
				uniqpoints.push(
				{
					x: poi.x,
					y: poi.y,
					labe: lab
				}
				);
				ctx.fillText(lab, poi.x, poi.y - 15);
				lines2add.push(nline1);
				lines2add.push(nline2);
				lines2del.push(l);
				divint.removeChild(s);
				divint.removeChild(i);
				divint.removeChild(lbl);
				document.getElementById("AngleArea").removeChild(divint);
				DrawArea.removeChild(tmp_canvasangle);
				tmp_canvas.addEventListener('mousedown', mouseDown, false);
				tmp_canvas.addEventListener('mouseup', mouseUp, false);
				tmp_canvas.addEventListener('mousemove', mouseMove, false);
				pind++;
				ind++;
				printuniq();
				split2(K, lab, poi);
				waitflag = 1;
			};

			if (waitflag == 1) {
				return;
			}
		}
	}
}

function split2(l, lab, poi)
{
	poi.x = Math.round(poi.x);
	poi.y = Math.round(poi.y);

	var nline1 =
	{
		start:
		{
			x: l.start.x,
			y: l.start.y,
			labe: l.start.labe
		},
		end:
		{
			x: poi.x,
			y: poi.y,
			labe: lab
		}
	};
	var nline2 =
	{
		start:
		{
			x: poi.x,
			y: poi.y,
			labe: lab
		},
		end:
		{
			x: l.end.x,
			y: l.end.y,
			labe: l.end.labe
		}
	};
	lines2add.push(nline1);
	lines2add.push(nline2);
	lines2del.push(l);
}

function line_stick_helper(currpoint)
{
	for (var i = lines.length - 1; i >= 0; i--)
	{
		var currm = slope(lines[i]);
		var currc = intercept(lines[i], currm);
		var ptx = (currpoint.x + currm * currpoint.y - currc * currm) / (Math.pow(currm, 2) + 1);
		var pty = (currpoint.x * currm + Math.pow(currm, 2) * currpoint.y + currc) / (Math.pow(currm, 2) + 1);
		x1 = lines[i].start.x;
		y1 = lines[i].start.y;
		x2 = lines[i].end.x;
		y2 = lines[i].end.y;
		var AB = Math.round(Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1)));
		var AP = Math.round(Math.sqrt((ptx - x1) * (ptx - x1) + (pty - y1) * (pty - y1)));
		var PB = Math.round(Math.sqrt((x2 - ptx) * (x2 - ptx) + (y2 - pty) * (y2 - pty)));
		if (((AB + 10) > (AP + PB)) && ((AB - 10) < (AP + PB)))
		{
			var dist = Math.round(Math.sqrt((ptx - currpoint.x) * (ptx - currpoint.x) + (pty - currpoint.y) * (pty - currpoint.y)));
			if (dist < 20)
				return ({
					x: ptx,
					y: pty,
					labe: '-'
				});
			else
				continue;
		}
		else
			continue;
	};
	return currpoint
}

function conditioncheck(l, k, poi)
{
	poix = Math.round(poi.x);
	poiy = Math.round(poi.y);
	if (((l.start.x == poix) && (l.start.y == poiy)) && ((k.start.x == poix) && (k.start.y == poiy)))
	{
		return false;
	}
	else if (((l.start.x == poix) && (l.start.y == poiy)) && ((k.end.x == poix) && (k.end.y == poiy)))
	{
		return false;
	}
	else if (((l.end.x == poix) && (l.end.y == poiy)) && ((k.start.x == poix) && (k.start.y == poiy)))
	{
		return false;
	}
	else if (((l.end.x == poix) && (l.end.y == poiy)) && ((k.end.x == poix) && (k.end.y == poiy)))
	{
		return false;
	}
	else if (((l.start.x + 5 > poix) && (l.start.x - 5 < poix)) && ((l.start.y + 5 > poiy) && (l.start.y - 5 < poiy)))
		return 2;
	else if (((l.end.x + 5 > poix) && (l.end.x - 5 < poix)) && ((l.end.y + 5 > poiy) && (l.end.y - 5 < poiy)))
		return 3;
	else if (((k.start.x + 5 > poix) && (k.start.x - 5 < poix)) && ((k.start.y + 5 > poiy) && (k.start.y - 5 < poiy)))
		return 4;
	else if (((k.end.x + 5 > poix) && (k.end.x - 5 < poix)) && ((k.end.y + 5 > poiy) && (k.end.y - 5 < poiy)))
		return 5;
	else
		return true;
}

function detectpoihandler()
{
	var c = detectpoi();
	modifylinesarray();
	while (c > 1)
	{
		c = detectpoi();
		modifylinesarray();
	}
}

function detectpoi()
{
	var counter = 0;
	for (var i = 0; i < points.length; i++)
	{
		for (var j = i + 1; j < points.length; j++)
		{
			if ((points[j].x == points[i].x) && (points[j].y == points[i].y))
			{
				points[j].labe = points[i].labe;
			}
		}
	}
	for (var i = 0; i < lines.length; i++)
	{
		for (var j = i + 1; j < lines.length; j++)
		{
			poi = intersection(lines[i], lines[j]);
			if (poi && (linesplitter(lines[i], lines[j], poi) != false)) {
				counter++;
			}
		}
	}
	modifylinesarray();
	return counter;
}

function clear_everything()
{
	location.reload();
}

function modifylinesarray()
{
	uniqlines = [];
	for (var i = lines2del.length - 1; i >= 0; i--)
	{
		var index = lines.indexOf(lines2del[i]);
		if (index > -1)
		{
			lines.splice(index, 1);
		}
	}
	for (var i = lines2add.length - 1; i >= 0; i--)
	{
		lines.push(lines2add[i]);
	};
	for (var i = 0; i < lines.length; i++)
	{
		var tempflag = 0;
		for (var j = i + 1; j < lines.length; j++)
		{
			if ((lines[j].start.x == lines[i].start.x) && (lines[j].start.y == lines[i].start.y) && (lines[j].end.x == lines[i].end.x) && (lines[j].end.y == lines[i].end.y))
			{
				tempflag = 1;
				break;
			}
		};
		if (tempflag == 0)
		{
			uniqlines.push(lines[i]);
		}
	};
	
	lines2add = [];
	lines2del = [];
	return;
}
