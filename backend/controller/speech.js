const url = 'https://api.murf.ai/v1/voice-changer/convert';
const form = new FormData();
form.append('audio_duration', '');
form.append('channel_type', '');
form.append('encode_output_as_base64', '');
form.append('file', '<file1>');
form.append('file_url', '');
form.append('format', '');
form.append('multi_native_locale', '');
form.append('pitch', '');
form.append('pronunciation_dictionary', '');
form.append('rate', '');
form.append('retain_accent', '');
form.append('retain_prosody', '');
form.append('return_transcription', '');
form.append('sample_rate', '');
form.append('style', '');
form.append('transcription', '');
form.append('variation', '');
form.append('voice_id', 'en-US-natalie');

const options = {method: 'POST'};

options.body = form;

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}5