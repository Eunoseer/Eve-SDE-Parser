# EVE Online SDE Parser

The purpose of this tool is to make it easier to remove unnecessary data from the SDE dumps that are provided by CCP after each patch.

While there are existing datasets out there courtesy of the community, my aim was to have a bit of fun building something that might actually be useful to someone else, as well as for my own projects.

Currently the application is intented to tackle the typeIDs.yaml file, returning a separate file that is purged of unnecessary language data (you have a choice!) as well as any unpublished items.

## Usage

The structure to running the tool is as follows:

```
npm run start "INPUT_PATH_TO_TYPESID_YAML" "OUTPUT_PATH_TO_SAVE_TO" "LANGUAGE_CODES" OVERWRITE_ENABLED
```

An example command to only include english and french, overwriting an existing file would look like:

```
npm run start "~\Downloads\sde\fsd\typeIDs.yaml" "~\Documents\EVE_DATA\sde\fde\typeIDs.yaml" "en,fr" true
```

If you do not want to overwrite an existing file, simply set OVERWRITE_ENABLED flag to false or omit it entirely (it is optional).

## Future Development

The current version of the tool only processes the typeIDs.yaml file, transforming it in a fixed manner. In the future I may add the ability for user to pass a template with the requested structure, allowing them to template and process the updated files easily.
