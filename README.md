# truncateLines

Truncate text in an HTML element to a chosen number of lines.

## Usage

```HTML
<p>
  <span class="truncate-3">Text to truncate</span>
</p>
<script>
// Truncate all the elements in the page with the class "truncate-3" to 3 lines
truncateLines('truncate-3', 3);
</script>
```

The text needs to be in an inline element, like a basic <span> or the function won't work.

The function should be called as soon as possible, ideally right after the text needing to be truncated.
The bottom of the page should work too.

This is because if the function is not called fast enough, the user might see the full text before it is truncated.

## Parameters

* `text_element` (string|HTMLElement|HTMLCollection) : Class name, HTML element or HTMLCollection of elements to be truncated.
* `max_lines` (integer) : Maximum number of lines.
* `replace` (string) : String added at the end of the text if it exceed the number of lines. Defaults to an ellipsis (…).

## Compatibility

This script should be compatible with all browsers going back to IE6.
