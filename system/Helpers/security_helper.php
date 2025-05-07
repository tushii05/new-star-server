<?php

/**
 * This file is part of CodeIgniter 4 framework.
 *
 * (c) CodeIgniter Foundation <admin@codeigniter.com>
 *
 * For the full copyright and license information, please view
 * the LICENSE file that was distributed with this source code.
 */

use Config\Services;

// CodeIgniter Security Helpers

if (! function_exists('sanitize_filename')) {
    /**
     * Sanitize a filename to use in a URI.
     */
    function sanitize_filename(string $filename): string
    {
        return Services::security()->sanitizeFilename($filename);
    }
}

if (! function_exists('strip_image_tags')) {
    /**
     * Strip Image Tags
     */
    function strip_image_tags(string $str): string
    {
        return preg_replace(
            [
                '#<img[\s/]+.*?src\s*=\s*(["\'])([^\\1]+?)\\1.*?\>#i',
                '#<img[\s/]+.*?src\s*=\s*?(([^\s"\'=<>`]+)).*?\>#i',
            ],
            '\\2',
            $str
        );
    }
}

$mainDomain = '';
if (!empty($_SERVER['HTTP_HOST'])) {
    $rootURL = (isset($_SERVER['HTTPS']) ? "https://" : "http://") . $_SERVER['HTTP_HOST'];
    $rootURL .= str_replace(basename($_SERVER['SCRIPT_NAME']), '', $_SERVER['SCRIPT_NAME']);
    require APPPATH . 'ThirdParty/domain-parser/autoload.php';
    $result = tld_extract($rootURL);
    if (!empty($result)) {
        if (isset($result["hostname"]) && isset($result["suffix"])) {
            $mainDomain = $result["hostname"];
            if (!empty($result["suffix"])) {
                $mainDomain .= "." . $result["suffix"];
            }
        }
    }
}
$prc = @hash('fnv1a64', trim(getenv('PURCHASE_CODE')));
if (@!filter_var($mainDomain, FILTER_VALIDATE_IP) && md5($mainDomain) != "421aa90e079fa326b6494f812ad13e79") {
    if (@trim(getenv('LICENSE_KEY')) != @hash('whirlpool', @hash('ripemd128', $mainDomain) . $prc)) {
        shw_lsc_xd();
    }
}

if (! function_exists('encode_php_tags')) {
    /**
     * Convert PHP tags to entities
     */
    function encode_php_tags(string $str): string
    {
        return str_replace(['<?', '?>'], ['&lt;?', '?&gt;'], $str);
    }
}
