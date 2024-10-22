<?php
$config_raw = file_get_contents("src/out/character.json");
$config_arr = json_decode($config_raw, true);

$heroes = [];
foreach($config_arr as $hero) {
    $heroes[] = $hero['name'];
}

$patches_raw = scandir("src/out");
$patches_in = array_diff(
    $patches_raw,
    ['.', '..']
);

$patch = [];
foreach($patches_in as $patch) {
    if(!is_dir("src/out/" . $patch)) {
        continue;
    }
    $patches[] = [
        $patch,
        (string) substr($patch, 0, 4),
        (string) substr($patch, 4, 2),
        (string) substr($patch, 6, 8),
    ];
}

$url = "https://overwut.com";
$lines = [];
    foreach($heroes as $hero) {
        $entry = [];
        $page = [
            urlencode($patch[1]),
            urlencode($patch[2]),
            urlencode($patch[3])
        ];
        $entry[] = "<url>";
        $entry[] = "<loc>".$url."/".urlencode($hero)."</loc>";
        $entry[] = "<lastmod>".date("Y-m-d")."</lastmod>";
        $entry[] = "</url>";
        $lines[] = implode(PHP_EOL, $entry);
    }
$raw_result = implode(PHP_EOL . PHP_EOL, $lines);
//var_dump($raw_result);
$sitemap_raw = file_get_contents("sitemap.xml");
$sitemap_new = str_replace("{{SITEMAP_CONTENT}}", $raw_result, $sitemap_raw);
file_put_contents("docs/sitemap.xml", $sitemap_new);