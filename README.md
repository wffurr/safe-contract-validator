# SA.FE Loot Buy Spreadsheet Script	
									
Author:          William Furr
Last Modified:   2016-10-23
License:         [CC BY-NC-SA 4.0][1]

## Purpose

This is a Google Apps script used in the [Nobody in Local [SA.FE]][2]
[loot buy program][3] in [EVE Online][4].

It uses the [EVE XML API][5] to fetch data about all of the contracts assigned
to SA.FE and then validates them against a set of rules and the matching data
from the [evepraisal.com API][6].  The results are returned as a 2-D array
suitable for display in a spreadsheet.

[1]: https://creativecommons.org/licenses/by-nc-sa/4.0/
[2]: https://evewho.com/corp/Nobody+in+Local
[3]: https://wiki.of-sound-mind.com/policy:alliance_loot
[4]: https://www.eveonline.com/
[5]: http://eveonline-third-party-documentation.readthedocs.io/en/latest/xmlapi/corporation/corp_contracts.html
[6]: https://github.com/evepraisal/evepraisal/blob/master/evepraisal/routes.py#L24