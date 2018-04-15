<?php
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);
    require_once('/home/u432755883/vendor/autoload.php');
    
    Pushpad\Pushpad::$auth_token = '7c7364248f2e32846e5797984fe01532';
    Pushpad\Pushpad::$project_id = 5374; # set it here or pass it as a param to methods later
    echo 'ok';

    /*$notification = new Pushpad\Notification(array(
  'body' => "As pontuações foram atualizadas!", # max 120 characters
//   'title' => "Website Name", # optional, defaults to your project name, max 30 characters
//   'target_url' => "http://example.com", # optional, defaults to your project website
//   'icon_url' => "http://example.com/assets/icon.png", # optional, defaults to the project icon
//   'image_url' => "http://example.com/assets/image.png", # optional, an image to display in the notification content
//   'ttl' => 604800, # optional, drop the notification after this number of seconds if a device is offline
//   'require_interaction' => true, # optional, prevent Chrome on desktop from automatically closing the notification after a few seconds
//   'custom_data' => "123", # optional, a string that is passed as an argument to action button callbacks
//   # optional, add some action buttons to the notification
//   # see https://pushpad.xyz/docs/action_buttons
//   'actions' => array(
//     array(
//       'title' => "My Button 1", # max length is 20 characters
//       'target_url' => "http://example.com/button-link", # optional
//       'icon' => "http://example.com/assets/button-icon.png", # optional
//       'action' => "myActionName" # optional
//     )
//   ),
//   'starred' => true, # optional, bookmark the notification in the Pushpad dashboard (e.g. to highlight manual notifications)
//   # optional, use this option only if you need to create scheduled notifications (max 5 days)
//   # see https://pushpad.xyz/docs/schedule_notifications
//   'send_at' => strtotime('2016-07-25 10:09'), # use a function like strtotime or time that returns a Unix timestamp
//   # optional, add the notification to custom categories for stats aggregation
//   # see https://pushpad.xyz/docs/monitoring
//   'custom_metrics' => array('examples', 'another_metric') # up to 3 metrics per notification
));

# deliver to a user
// $notification->deliver_to($user_id);

# deliver to a group of users
// $notification->deliver_to($user_ids);

# deliver to some users only if they have a given preference
# e.g. only $users who have a interested in "events" will be reached
// $notification->deliver_to($users, ["tags" => ["events"]]);

# deliver to segments
# e.g. any subscriber that has the tag "segment1" OR "segment2"
// $notification->broadcast(["tags" => ["segment1", "segment2"]]);

# you can use boolean expressions 
# they must be in the disjunctive normal form (without parenthesis)
// $notification->broadcast(["tags" => ["zip_code:28865 && !optout:local_events || friend_of:Organizer123"]]);
// $notification->deliver_to($users, ["tags" => ["tag1 && tag2", "tag3"]]); # equal to "tag1 && tag2 || tag3"

# deliver to everyone
$notification->broadcast();
echo 'ok';*/

    $ranking = $_POST["users"];

    $tempData = html_entity_decode($ranking);
    $cleanData = json_decode($tempData);

    $index = 1;
    foreach ($cleanData as $value) {
        // $value->name;
        // $value->pontuacao;

        $notification = new Pushpad\Notification(array(
        'body' => "Olá, " . $value->name . "! Estes são seus dados da nova rodada: " . $value->pontuacao . 'pts | ' . $index . 'º lugar', # max 120 characters
        'title' => "Bolão Maurício - Pontuação", # optional, defaults to your project name, max 30 characters
        //   'target_url' => "http://example.com", # optional, defaults to your project website
        //   'icon_url' => "http://example.com/assets/icon.png", # optional, defaults to the project icon
        //   'image_url' => "http://example.com/assets/image.png", # optional, an image to display in the notification content
        //   'ttl' => 604800, # optional, drop the notification after this number of seconds if a device is offline
        //   'require_interaction' => true, # optional, prevent Chrome on desktop from automatically closing the notification after a few seconds
        //   'custom_data' => "123", # optional, a string that is passed as an argument to action button callbacks
        //   # optional, add some action buttons to the notification
        //   # see https://pushpad.xyz/docs/action_buttons
        //   'actions' => array(
        //     array(
        //       'title' => "My Button 1", # max length is 20 characters
        //       'target_url' => "http://example.com/button-link", # optional
        //       'icon' => "http://example.com/assets/button-icon.png", # optional
        //       'action' => "myActionName" # optional
        //     )
        //   ),
        //   'starred' => true, # optional, bookmark the notification in the Pushpad dashboard (e.g. to highlight manual notifications)
        //   # optional, use this option only if you need to create scheduled notifications (max 5 days)
        //   # see https://pushpad.xyz/docs/schedule_notifications
        //   'send_at' => strtotime('2016-07-25 10:09'), # use a function like strtotime or time that returns a Unix timestamp
        //   # optional, add the notification to custom categories for stats aggregation
        //   # see https://pushpad.xyz/docs/monitoring
        //   'custom_metrics' => array('examples', 'another_metric') # up to 3 metrics per notification
        ));

        // $nameKey = preg_replace('/[[:^print:]]/', '', preg_replace("/[^ \w]+/", "", str_replace(' ', '_', $value->name . ' ' . $value->page)));

        $notification->deliver_to($value->name);

        $index++;
        echo 'ok';
    }
?>