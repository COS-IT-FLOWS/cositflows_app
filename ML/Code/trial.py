import multiprocessing
import matplotlib.pyplot as plt

def plot_graph(a, b, result_queue):
    x = list(range(1, 11))
    y = [a * xi + b for xi in x]
    result_queue.put((a, b, x, y))

if __name__ == "__main__":
    # Define values of a and b for each process
    params = [(2, 3), (1, 4), (3, 2)]

    # Create a multiprocessing Queue to store results
    result_queue = multiprocessing.Queue()

    # Create and start a process for each set of parameters
    processes = []
    for a, b in params:
        p = multiprocessing.Process(target=plot_graph, args=(a, b, result_queue))
        processes.append(p)
        p.start()

    # Wait for all processes to finish
    for p in processes:
        p.join()

    # Retrieve results from the queue and plot graphs
    while not result_queue.empty():
        a, b, x, y = result_queue.get()
        plt.plot(x, y, label=f'y={a}x+{b}')

    plt.xlabel('x')
    plt.ylabel('y')
    plt.title('Graphs of y=ax+b with different values of a and b')
    plt.legend()
    plt.show()
