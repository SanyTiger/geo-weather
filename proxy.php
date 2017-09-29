<?php

//* Project Information *//
// Project Name:          Weather API using OpenWeatherAPI
// Porject File:          proxy.php (3/3)
// Porject File Type:     PHP

  header("Content-Type: application/json");
  $host = "http://api.openweathermap.org/data/2.5/weather";
  $query = $_SERVER['QUERY_STRING'];
  $ch = curl_init($host . "?" . $query);
  curl_exec($ch);
  curl_close($ch);
?>
