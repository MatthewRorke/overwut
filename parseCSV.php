<?php
if(!$argv[1]) {
    echo "Usage: php parseCSV.php <date>\n";
    exit(1);
}

require('vendor/autoload.php');
use Aspera\Spreadsheet\XLSX\Reader;

DEFINE('true_line_break', "\r\n"); // PHP_EOL allows for both \r and \r\n which messes with in-column linebreaks

function generateJson($data, $filename) {
    global $argv;
    $json = json_encode($data, JSON_PRETTY_PRINT);
    file_put_contents('./src/out/'.$argv[1].'/'.$filename, $json);
}

$reader = new Reader();
$reader->open('in/OW.xlsx');

$selectedSheetIndexes = [
    'resistance' => null,
    'skills' => null,
    'characters' => null
];

foreach($reader->getSheets() as $index=>$sheet) {
    if(!strpos($sheet->getName(), $argv[1])) {
        continue;
    }
    $sheet_name = $sheet->getName();
    if(strpos($sheet_name, 'Resistances') !== false) {
        $selectedSheetIndexes['resistance'] = $index;
    }
    if(strpos($sheet_name, 'Skills') !== false) {
        $selectedSheetIndexes['skills'] = $index;
    }
    if(strpos($sheet_name, 'Character') !== false) {
        $selectedSheetIndexes['characters'] = $index;
    }
}

function generateResistancesJson($reader, $index) {
    $reader->changeSheet($index);
    foreach ($reader as $row) {
        if(strtolower($row[0]) == "name") continue;
        list($name) = $row;
        $ret[] = [
            'name' => trim(strtolower($name))
        ];
    }
    generateJson($ret, 'resistance.json');
}
generateResistancesJson($reader, $selectedSheetIndexes['resistance']);

function generateSkillJson($reader, $index) {
    $reader->changeSheet($index);
    foreach ($reader as $row) {
        if(count($row) < 2) continue;

        @list($name, $type, $trigger, $meta, $resistance_1, $resistance_2, $resistance_3, $resistance_4, $resistance_5, $resistance_6) = $row;

        if(strtolower($row[0]) == "name") continue;
        
        $meta_arr = explode("\n", $meta);
        $new_meta = [];
        $lastKey = null;
        foreach($meta_arr as $meta_item) {
            $key = $lastKey;
            $value = $meta_item;
            if(strpos($meta_item, ':')) {
                $workingObject = explode(':', $meta_item);
                $key = $workingObject[0];
                $value = $workingObject[1];
                $lastKey = $key;
            }
            $new_meta[] = [
                'key' => is_null($key) ? null : strtolower(trim($key)),
                'value' => $value
            ];
        }
        $ret[] = [
            'name' => trim(strtolower($row[0])),
            'type' => $row[1],
            'trigger' => $row[2],
            'meta' => $new_meta,
            'resistances' => [
                fixString($row[4]),
                fixString($row[5]),
                fixString($row[6]),
                fixString($row[7]),
                fixString($row[8]),
@               fixString($row[9])
            ]
        ];
    }
    
    generateJson($ret, 'skill.json');
}
generateSkillJson($reader, $selectedSheetIndexes['skills']);

function generateCharactersJson($reader, $index) {
    $reader->changeSheet($index);
    foreach ($reader as $row) {
        @list($name, $role, $health, $shield, $special_health, $overhealth, $armor, $image, $skill_1, $skill_2, $skill_3, $skill_4, $skill_5, $skill_6, $skill_7, $skill_8) = $row;
        echo trim($name) . PHP_EOL;
        if(strtolower($row[0]) == "name") continue;        
        $ret[] = [
            'name' => fixString($name),
            'role' => fixString($role),
            'health' => $health,
            'shield' => $shield,
            'special_health' => $special_health,
            'overhealth' => $overhealth,
            'armor' => $armor,
            'image' => $image,
            'skills' => [
                fixString($skill_1),
                fixString($skill_2),
                fixString($skill_3),
                fixString($skill_4),
@               fixString($skill_5),
@               fixString($skill_6),
@               fixString($skill_7),
@               fixString($skill_8),
            ]
        ];
        echo 'Done ... ' . PHP_EOL . PHP_EOL;
    }
    generateJson($ret, 'character.json');

    $reader->close();
}
generateCharactersJson($reader, $selectedSheetIndexes['characters']);

function fixString($string) {
    if(is_null($string)) {
        echo 'Null String found, ignoring' . PHP_EOL;
        return null;
    }
    return strtolower(
        trim($string)
    );
}