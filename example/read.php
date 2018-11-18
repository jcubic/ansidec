<?php
if (isset($_GET['action'])) {
    if ($_GET['action'] == 'ls') {
        echo shell_exec('ls');
    }
} else if (isset($_GET['file'])) {
    echo shell_exec(sprintf("iconv -f CP437 -t UTF-8 < %s", $_GET['file']));
}
?>
