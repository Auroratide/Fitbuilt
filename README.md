# Fitbuilt

**Fitbuilt** is a generic, minimalistic pipeline radiator! It shows you the state of your built, whether it's green, in progress, or broken. And it has fitbit-inspired icons, for giggles and laughs I guess.

Well, not yet actually. Right now it only supports Azure Devops pipelines, but hey you gotta start somewhere!

## Work in Progress

This isn't exactly ready for use yet.

## Configuration

In order to use this with Azure Devops, you must set the `AZURE_DEVOPS_CRED` environment variable to a string of the form `username:personalaccesstoken`.

## Roadmap

* Handle login to different services from the front end
* Publish components into web-components for extremely easy portability and use (aka. no compile step!)
* Unify the mocking of `fetch`, because _that was such a big pain_