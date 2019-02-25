<?php

/**
 * Invoke hook_field_info().
 */
function sound_field_info() {
  return array(
    'sound' => array(
      'label' => t('Sound'),
      'description' => t('This field stores the ID of the sound file as an integer value.'),
      'settings' => array(
        'display_field' => 0,
        'uri_scheme' => variable_get('file_default_scheme', 'public'),
      ),
      'instance_settings' => array(
        'file_extensions' => 'ogg,mp3',
        'file_directory' => '',
        'max_filesize' => '',
        'descritpion_field' => 0,
      ),
      'defatul_widget' => 'file_generic',
      'default_formatter' => 'file_default',
    ),
  );
}
