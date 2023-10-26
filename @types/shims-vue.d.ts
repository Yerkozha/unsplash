declare module '*.vue' {
    import { defineComponent } from "vue";
    
    const Component: ReturnType<typeof defineComponent>

    export default Component
}

declare type Nullable<T> = T | null | undefined;

declare module "*.png"