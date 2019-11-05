export function addMappingToMetadata(objectToAdd: any, target: any, key: symbol) {
    let mappings: any[] = [];
    if (Reflect.hasMetadata(key, target)) {
        mappings = Reflect.getMetadata(key, target)
    }
    mappings.push(objectToAdd);
    Reflect.defineMetadata(key, mappings, target);
}