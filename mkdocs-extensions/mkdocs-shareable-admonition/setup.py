from setuptools import setup, find_packages

setup(
    name='mkdocs-shareable-admonition',
    version='0.1.0',
    description='An MkDocs plugin to create shareable admonitions',
    long_description='',
    keywords='mkdocs python markdown',
    url='',
    author='',
    author_email='',
    license='MIT',
    python_requires='>=3.5',
    install_requires=[
        'mkdocs>=1.0.4'
    ],
    package_dir={'': 'src'},  # Set the package directory to src
    packages=find_packages(where='src'),  # Look for packages in src directory
    include_package_data=True,
    entry_points={
        'mkdocs.plugins': [
            'shareable_admonition = shareable_admonition:ShareableAdmonitionPlugin'
        ]
    }
)
