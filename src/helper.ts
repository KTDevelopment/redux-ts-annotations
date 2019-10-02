export function addMappingToMetadata(objectToAdd, target, key) {
    let mappings: any[] = [];
    if (Reflect.hasMetadata(key, target)) {
        mappings = Reflect.getMetadata(key, target)
    }
    mappings.push(objectToAdd);
    Reflect.defineMetadata(key, mappings, target);
}