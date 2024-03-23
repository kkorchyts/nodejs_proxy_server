it("", () => {

})

describe("Training", () => {
    describe("types", () => {
        it("new type", () => {
            type C = {
                x: string,
                y: number
            }
            const c: C = {x: "", y: 1};
            console.log(c);

            type newFn<T> = (a:T) => T;
            const fn: newFn<number> = (a: number): number => {
                console.log(++a);
                return a
            };
            console.log(fn(10));

        })
        describe("utility types", () => {
            it("Partial", () => {
                interface Todo {
                    title: string;
                    description: string;
                }

                function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
                    return { ...todo, ...fieldsToUpdate };
                }

                const todo1 = {
                    title: "Learn TypeScript",
                    description: "Study the TypeScript documentation"
                };

                const updatedTodo = updateTodo(todo1, { description: "Write some code" });

                console.log(updatedTodo);
            })
            it("Readonly", () => {
                interface Point {
                    x: number;
                    y: number;
                }

                const point: Readonly<Point> = { x: 10, y: 20 };

                // point.y = 13; ERROR
            })
            it("Pick", () => {
                interface Todo {
                    title: string;
                    description: string;
                    completed: boolean;
                }

                type TodoPreview = Pick<Todo, "title" | "completed">;

                const todo: TodoPreview = {
                    title: "Learn TypeScript",
                    completed: false,
                    // description: "", ERROR
                };
            })
            it("Omit", () => {
                interface Todo {
                    title: string;
                    description: string;
                    completed: boolean;
                }

                type TodoPreview = Omit<Todo, "description">;

                const todo: TodoPreview = {
                    title: "Learn TypeScript",
                    completed: false,
                    // description: "", ERROR
                };
            })
            it("Record", () => {
                interface CatInfo {
                    age: number;
                    breed: string;
                }

                const cats: Record<string, CatInfo> = {
                    "Coco": { age: 2, breed: "Persian" },
                    "Whiskers": { age: 5, breed: "Siamese" },
                };

                console.log(cats);
            })
        })
        it("Generics", () => {
            function identity<T>(arg: T): T {
                return arg;
            }

            let result1: string = identity<string>("hello");
            let result2 = identity(10); // Тип result2: number

            class GenericClass<T> {
                constructor(readonly value: T) {
                    this.value = value;
                }

                getValue(): T {
                    return this.value;
                }
            }

            let instance1: GenericClass<string> = new GenericClass<string>("hello");
            let instance2 = new GenericClass(10);
        })
    })

})