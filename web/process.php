<?php

/**
This file is the link between the UI and the python layer.
The code below writes the data received into a json file and then invokes the python code
to compute the missing information
*/

if (!empty($_POST['data'])) {
	$data = $_POST['data'];
	$fileName = "datafile.json";
	$file = fopen($fileName, 'w');
	fwrite($file,($data));
	fclose($file);
}

$res = array();
$res = shell_exec("python ../compute/inferenceTool.py 2>&1");
echo $res;

?>