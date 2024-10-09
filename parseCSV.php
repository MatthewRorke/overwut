<?php
require('vendor/autoload.php');
use Aspera\Spreadsheet\XLSX\Reader;

DEFINE('true_line_break', "\r\n"); // PHP_EOL allows for both \r and \r\n which messes with in-column linebreaks

function generateJson($data, $filename) {
    $json = json_encode($data, JSON_PRETTY_PRINT);
    file_put_contents('./src/out/'.$filename, $json);
}

$reader = new Reader();
$reader->open('in/OW.xlsx');

function generateResistancesJson($reader) {
    $reader->changeSheet(2);
    foreach ($reader as $row) {
        if(strtolower($row[0]) == "name") continue;
        list($name) = $row;
        $ret[] = [
            'name' => strtolower($name)
        ];
    }
    generateJson($ret, 'resistance.json');
}
generateResistancesJson($reader);

function generateSkillJson($reader) {
    $reader->changeSheet(1);
    foreach ($reader as $row) {
        if(count($row) < 9) continue;
        //print_r($row);

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
            'name' => strtolower($row[0]),
            'type' => $row[1],
            'trigger' => $row[2],
            'meta' => $new_meta,
            'resistances' => [
                $row[4],
                $row[5],
                $row[6],
                $row[7],
                $row[8],
@               $row[9]
            ]
        ];
    }
    
    generateJson($ret, 'skill.json');
}
generateSkillJson($reader);

function generateCharactersJson($reader) {
    $reader->changeSheet(0);
    foreach ($reader as $row) {
        @list($name, $role, $health, $shield, $special_health, $overhealth, $image, $skill_1, $skill_2, $skill_3, $skill_4, $skill_5, $skill_6, $skill_7, $skill_8) = $row;

        if(strtolower($row[0]) == "name") continue;        
        $ret[] = [
            'name' => strtolower($name),
            'role' => strtolower($role),
            'health' => $health,
            'shield' => $shield,
            'special_health' => $special_health,
            'overhealth' => $overhealth,
            'image' => $image,
            'skills' => [
                strtolower($skill_1),
                strtolower($skill_2),
                strtolower($skill_3),
                strtolower($skill_4),
                strtolower($skill_5),
                strtolower($skill_6),
                strtolower($skill_7),
                strtolower($skill_8),
            ]
        ];
    }
    generateJson($ret, 'character.json');

    $reader->close();
}
generateCharactersJson($reader);