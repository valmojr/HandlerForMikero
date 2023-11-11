# MIKERO'S TOOLS SELF ACTIONS
This actions was meant to be used by projects that are too large to be rebuilded on each pushed commit, instead of building the whole project on running the action, only the changed, created or deleted addons will be generated from this actions, meaning you will have to store them somewhere else.
### File Structure
This actions also presumes that you uses this project structure:
```
root_dir/
    addon_1/
    addon_2/
    addon_3/
    addon_4/
```
if you are using the CBA mod structure, you will have to point the addons folder as root action.
### Example