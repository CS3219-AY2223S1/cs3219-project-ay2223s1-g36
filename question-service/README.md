# Question service
Provides question for the matched users to solve

## Pre-requisite
Ensure `ques.json` containing the question bank is stored in the root directory of question-service.

## Data format
The original question bank is stored as a list of JSON objects in the following format, e.g.
```json
    {
        "qid": 1,
        "question_title": "Roman to Integer",
        "difficulty": 1,
        "question_text": "<div class=\"content__u3I1 question-content__JfgR\"><div><p>Roman numerals are represented by seven different symbols:\u00a0<code>I</code>, <code>V</code>, <code>X</code>, <code>L</code>, <code>C</code>, <code>D</code> and <code>M</code>.</p>\n<pre><strong>Symbol</strong>       <strong>Value</strong>\nI             1\nV             5\nX             10\nL             50\nC             100\nD             500\nM             1000</pre>\n<p>For example,\u00a0<code>2</code> is written as <code>II</code>\u00a0in Roman numeral, just two ones added together. <code>12</code> is written as\u00a0<code>XII</code>, which is simply <code>X + II</code>. The number <code>27</code> is written as <code>XXVII</code>, which is <code>XX + V + II</code>.</p>\n<p>Roman numerals are usually written largest to smallest from left to right. However, the numeral for four is not <code>IIII</code>. Instead, the number four is written as <code>IV</code>. Because the one is before the five we subtract it making four. The same principle applies to the number nine, which is written as <code>IX</code>. There are six instances where subtraction is used:</p>\n<ul>\n<li><code>I</code> can be placed before <code>V</code> (5) and <code>X</code> (10) to make 4 and 9.\u00a0</li>\n<li><code>X</code> can be placed before <code>L</code> (50) and <code>C</code> (100) to make 40 and 90.\u00a0</li>\n<li><code>C</code> can be placed before <code>D</code> (500) and <code>M</code> (1000) to make 400 and 900.</li>\n</ul>\n<p>Given a roman numeral, convert it to an integer.</p>\n<p>\u00a0</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<pre><strong>Input:</strong> s = \"III\"\n<strong>Output:</strong> 3\n<strong>Explanation:</strong> III = 3.\n</pre>\n<p><strong class=\"example\">Example 2:</strong></p>\n<pre><strong>Input:</strong> s = \"LVIII\"\n<strong>Output:</strong> 58\n<strong>Explanation:</strong> L = 50, V= 5, III = 3.\n</pre>\n<p><strong class=\"example\">Example 3:</strong></p>\n<pre><strong>Input:</strong> s = \"MCMXCIV\"\n<strong>Output:</strong> 1994\n<strong>Explanation:</strong> M = 1000, CM = 900, XC = 90 and IV = 4.\n</pre>\n<p>\u00a0</p>\n<p><strong>Constraints:</strong></p>\n<ul>\n<li><code>1 &lt;= s.length &lt;= 15</code></li>\n<li><code>s</code> contains only\u00a0the characters <code>('I', 'V', 'X', 'L', 'C', 'D', 'M')</code>.</li>\n<li>It is <strong>guaranteed</strong>\u00a0that <code>s</code> is a valid roman numeral in the range <code>[1, 3999]</code>.</li>\n</ul>\n</div></div>"
    }
```
Note that for difficulty level:
- 1: Easy
- 2: Medium
- 3: Hard

## Running the service

```sh
$ docker-compose up --build
```

## Stopping the service
```sh
$ docker-compose down
```

## Testing the service
```sh
$ docker-compose -f docker-compose.test.yaml up --build --abort-on-container-exit
```

# Using the service
## Communicate with the service
Send http requests to the service via port `8003`

## API commands
### Getting a question via its qid
- `GET /api/question/getQues/:qid`
    - Replace `:qid` in the http parameters with the desired `qid` in `integer` format
    - Response: successful status `200` and JSON message, e.g.
        ```json
            {
                "qid": 1,
                "question_title": "Roman to Integer",
                "difficulty": 1,
                "question_text": "<div class=\"content__u3I1 question-content__JfgR\"><div><p>Roman numerals are represented by seven different symbols:\u00a0<code>I</code>, <code>V</code>, <code>X</code>, <code>L</code>, <code>C</code>, <code>D</code> and <code>M</code>.</p>\n<pre><strong>Symbol</strong>       <strong>Value</strong>\nI             1\nV             5\nX             10\nL             50\nC             100\nD             500\nM             1000</pre>\n<p>For example,\u00a0<code>2</code> is written as <code>II</code>\u00a0in Roman numeral, just two ones added together. <code>12</code> is written as\u00a0<code>XII</code>, which is simply <code>X + II</code>. The number <code>27</code> is written as <code>XXVII</code>, which is <code>XX + V + II</code>.</p>\n<p>Roman numerals are usually written largest to smallest from left to right. However, the numeral for four is not <code>IIII</code>. Instead, the number four is written as <code>IV</code>. Because the one is before the five we subtract it making four. The same principle applies to the number nine, which is written as <code>IX</code>. There are six instances where subtraction is used:</p>\n<ul>\n<li><code>I</code> can be placed before <code>V</code> (5) and <code>X</code> (10) to make 4 and 9.\u00a0</li>\n<li><code>X</code> can be placed before <code>L</code> (50) and <code>C</code> (100) to make 40 and 90.\u00a0</li>\n<li><code>C</code> can be placed before <code>D</code> (500) and <code>M</code> (1000) to make 400 and 900.</li>\n</ul>\n<p>Given a roman numeral, convert it to an integer.</p>\n<p>\u00a0</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<pre><strong>Input:</strong> s = \"III\"\n<strong>Output:</strong> 3\n<strong>Explanation:</strong> III = 3.\n</pre>\n<p><strong class=\"example\">Example 2:</strong></p>\n<pre><strong>Input:</strong> s = \"LVIII\"\n<strong>Output:</strong> 58\n<strong>Explanation:</strong> L = 50, V= 5, III = 3.\n</pre>\n<p><strong class=\"example\">Example 3:</strong></p>\n<pre><strong>Input:</strong> s = \"MCMXCIV\"\n<strong>Output:</strong> 1994\n<strong>Explanation:</strong> M = 1000, CM = 900, XC = 90 and IV = 4.\n</pre>\n<p>\u00a0</p>\n<p><strong>Constraints:</strong></p>\n<ul>\n<li><code>1 &lt;= s.length &lt;= 15</code></li>\n<li><code>s</code> contains only\u00a0the characters <code>('I', 'V', 'X', 'L', 'C', 'D', 'M')</code>.</li>\n<li>It is <strong>guaranteed</strong>\u00a0that <code>s</code> is a valid roman numeral in the range <code>[1, 3999]</code>.</li>\n</ul>\n</div></div>"

            }
        ```
    - If receive status `400`, potential source of error:
        - Invalid qid (e.g., outside of range) is provided
        - No qid is provided

- `GET /api/question/getQuesForDifficulty/:difficulty`
    - Returns a random question with the selected difficulty
    - Example request
        ```
            http://localhost/8003/api/question/getQuesForDifficulty/1
        ```
    - Example response: status `200` with JSON message, i.e.
        ```json
            {
                "qid": 1,
                "question_title": "Roman to Integer",
                "difficulty": 1,
                "question_text": "<div class=\"content__u3I1 question-content__JfgR\"><div><p>Roman numerals are represented by seven different symbols:\u00a0<code>I</code>, <code>V</code>, <code>X</code>, <code>L</code>, <code>C</code>, <code>D</code> and <code>M</code>.</p>\n<pre><strong>Symbol</strong>       <strong>Value</strong>\nI             1\nV             5\nX             10\nL             50\nC             100\nD             500\nM             1000</pre>\n<p>For example,\u00a0<code>2</code> is written as <code>II</code>\u00a0in Roman numeral, just two ones added together. <code>12</code> is written as\u00a0<code>XII</code>, which is simply <code>X + II</code>. The number <code>27</code> is written as <code>XXVII</code>, which is <code>XX + V + II</code>.</p>\n<p>Roman numerals are usually written largest to smallest from left to right. However, the numeral for four is not <code>IIII</code>. Instead, the number four is written as <code>IV</code>. Because the one is before the five we subtract it making four. The same principle applies to the number nine, which is written as <code>IX</code>. There are six instances where subtraction is used:</p>\n<ul>\n<li><code>I</code> can be placed before <code>V</code> (5) and <code>X</code> (10) to make 4 and 9.\u00a0</li>\n<li><code>X</code> can be placed before <code>L</code> (50) and <code>C</code> (100) to make 40 and 90.\u00a0</li>\n<li><code>C</code> can be placed before <code>D</code> (500) and <code>M</code> (1000) to make 400 and 900.</li>\n</ul>\n<p>Given a roman numeral, convert it to an integer.</p>\n<p>\u00a0</p>\n<p><strong class=\"example\">Example 1:</strong></p>\n<pre><strong>Input:</strong> s = \"III\"\n<strong>Output:</strong> 3\n<strong>Explanation:</strong> III = 3.\n</pre>\n<p><strong class=\"example\">Example 2:</strong></p>\n<pre><strong>Input:</strong> s = \"LVIII\"\n<strong>Output:</strong> 58\n<strong>Explanation:</strong> L = 50, V= 5, III = 3.\n</pre>\n<p><strong class=\"example\">Example 3:</strong></p>\n<pre><strong>Input:</strong> s = \"MCMXCIV\"\n<strong>Output:</strong> 1994\n<strong>Explanation:</strong> M = 1000, CM = 900, XC = 90 and IV = 4.\n</pre>\n<p>\u00a0</p>\n<p><strong>Constraints:</strong></p>\n<ul>\n<li><code>1 &lt;= s.length &lt;= 15</code></li>\n<li><code>s</code> contains only\u00a0the characters <code>('I', 'V', 'X', 'L', 'C', 'D', 'M')</code>.</li>\n<li>It is <strong>guaranteed</strong>\u00a0that <code>s</code> is a valid roman numeral in the range <code>[1, 3999]</code>.</li>\n</ul>\n</div></div>"

            }
        ```
        